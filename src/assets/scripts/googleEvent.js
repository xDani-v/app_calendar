const CLIENT_ID =
    "930833813110-bo6le9a3esgpv6oc29rgbov8up181dsp.apps.googleusercontent.com";
const API_KEY = "AIzaSyBySOAabOS954Af8nqoNYYkqq5R2lCtWj4";
const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";
let tokenClient;
let gapiInited = false;
let gisInited = false;
function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
}
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
}
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "", // defined later
    });
    gisInited = true;
}
function createGoogleEvent(eventDetails) {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw resp;
        }
        await scheduleEvent(eventDetails);
    };
    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
        tokenClient.requestAccessToken({ prompt: "" });
    }
}

function scheduleEvent(eventDetails) {
    const event = {
        summary: eventDetails.summary, // Personaliza el resumen del evento
        location: eventDetails.location, // Personaliza la ubicación del evento
        description: eventDetails.description, // Personaliza la descripción del evento
        start: {
            dateTime: eventDetails.startTime,
            timeZone: "America/Guayaquil",
        },
        end: {
            dateTime: eventDetails.endTime,
            timeZone: "America/Guayaquil",
        },
        recurrence: eventDetails.recurrence, // Personaliza la recurrencia del evento
        attendees: eventDetails.email, // Personaliza los asistentes al evento
        reminders: {
            useDefault: false,
            overrides: eventDetails.reminders, // Personaliza los recordatorios del evento
        },
    };
    const request = gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
    });
    request.execute(function (event) {
        console.info("Event created: " + event.htmlLink);
    });
}
