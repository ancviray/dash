import { Component } from '@angular/core';

@Component({
  selector: 'app-doctors-schedule',
  standalone: false,
  
  templateUrl: './doctors-schedule.component.html',
  styleUrl: './doctors-schedule.component.css'
})
export class DoctorsScheduleComponent {

  selectedDoctor: string = 'santos'; // Default to Dr. Santos
  
  // Dr. Camilo B. Santos Schedule
isEditMode: boolean = false;
doctorSchedule = [
  { 
    day: 'Monday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  },
  { 
    day: 'Tuesday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  },
  { 
    day: 'Wednesday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  },
  { 
    day: 'Thursday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  },
  { 
    day: 'Friday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  },
  { 
    day: 'Saturday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  }
  // Add more days as necessary...
];

// Dr. Marietta G. Nery Schedule
isEditModeMarietta: boolean = false;
doctorScheduleMarietta = [
  { 
    day: 'Monday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  },
  { 
    day: 'Tuesday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  },
  { 
    day: 'Wednesday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  },
  { 
    day: 'Thursday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  },
  { 
    day: 'Friday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  },
  { 
    day: 'Saturday', 
    morning: [
      { time: '8:00 AM', isRed: false },
      { time: '9:00 AM', isRed: false },
      { time: '10:00 AM', isRed: false },
      { time: '11:00 AM', isRed: false }
    ],
    afternoon: [
      { time: '1:00 PM', isRed: false },
      { time: '2:00 PM', isRed: false },
      { time: '3:00 PM', isRed: false },
      { time: '4:00 PM', isRed: false },
      { time: '5:00 PM', isRed: false }
    ],
    isEditing: false
  }
  // Add more days as necessary...
];

  // Toggle edit mode for Dr. Camilo
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  // Toggle the color of the time slot for Dr. Camilo
  toggleTimeColor(timeArray: any[], index: number): void {
    if (this.isEditMode) {
      timeArray[index].isRed = !timeArray[index].isRed;
    }
  }

  // Save the schedule for Dr. Camilo
  saveSchedule(schedule: any): void {
    schedule.isEditing = false;
    console.log('Schedule saved for Dr. Camilo', schedule.day);
  }

  // Toggle edit mode for Dr. Marietta
  toggleEditModeMarietta(): void {
    this.isEditModeMarietta = !this.isEditModeMarietta;
  }

  // Toggle the color of the time slot for Dr. Marietta
  toggleTimeColorMarietta(timeArray: any[], index: number): void {
    if (this.isEditModeMarietta) {
      timeArray[index].isRed = !timeArray[index].isRed;
    }
  }

  // Save the schedule for Dr. Marietta
  saveScheduleMarietta(schedule: any): void {
    schedule.isEditing = false;
    console.log('Schedule saved for Dr. Marietta', schedule.day);
  }

  // Toggle doctor schedule
  toggleDoctor(doctor: string): void {
    this.selectedDoctor = doctor;
  }
}