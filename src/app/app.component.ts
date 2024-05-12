import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app_calendar';





}
