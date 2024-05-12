import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
declare var createGoogleEvent: any;
declare var getEvents: any;

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {
  constructor(private fb: FormBuilder) { }
  appointmentForm!: FormGroup;

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      summary: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });


  }

  scheduleMeeting() {
    let appointmentTime = new Date(this.appointmentForm.value.appointmentTime);
    appointmentTime.setHours(appointmentTime.getHours() - 5);
    const startTime = appointmentTime.toISOString().slice(0, 18);
    const endTime = this.getEndTime(appointmentTime);
    const eventDetails = {
      summary: this.appointmentForm.value.summary,
      location: this.appointmentForm.value.location,
      description: this.appointmentForm.value.description,
      startTime: startTime,
      endTime: endTime,
      email: this.appointmentForm.value.email,
      // Add your default values for recurrence, attendees, and reminders here
    };
    console.info(eventDetails);

    createGoogleEvent(eventDetails);
  }

  getEndTime(appointmentTime: Date) {
    appointmentTime.setHours(appointmentTime.getHours() + 1);
    const endTime = appointmentTime.toISOString().slice(0, 18);
    return endTime;
  }



}
