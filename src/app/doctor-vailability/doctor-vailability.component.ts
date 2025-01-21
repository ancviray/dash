import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-vailability',
  standalone: false,
  
  templateUrl: './doctor-vailability.component.html',
  styleUrl: './doctor-vailability.component.css'
})
export class DoctorVailabilityComponent {
  today: string = new Date().toLocaleDateString('en-US', {
    weekday: 'long',  // "Monday"
    year: 'numeric',  // "2025"
    month: 'long',    // "January"
    day: 'numeric'    // "1"
  });
  doctors = [
    {
      name: 'Dr. Camilo B. Santos, RMT, MD, FPASMAP',
      role: 'Physician',
      day: 'Monday',
      morningSchedule: ['9:00 AM', '10:00 AM', '11:00 AM'],
      afternoonSchedule: ['1:00 PM', '2:00 PM', '3:00 PM']
    },
    {
      name: 'Dr. Marietta G. Nery, DMD',
      role: 'Dentist',
      day: 'Tuesday',
      morningSchedule: ['9:00 AM', '10:00 AM', '11:00 AM'],
      afternoonSchedule: ['1:00 PM', '2:00 PM', '3:00 PM']
    },
    {
      name: 'Dr. Camilo B. Santos, RMT, MD, FPASMAP',
      role: 'Physician',
      day: 'Wednesday',
      morningSchedule: ['9:00 AM', '10:00 AM', '11:00 AM'],
      afternoonSchedule: ['1:00 PM', '2:00 PM', '3:00 PM']
    },
    {
      name: 'Dr. Marietta G. Nery, DMD',
      role: 'Dentist',
      day: 'Thursday',
      morningSchedule: ['9:00 AM', '10:00 AM', '11:00 AM'],
      afternoonSchedule: ['1:00 PM', '2:00 PM', '3:00 PM']
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}