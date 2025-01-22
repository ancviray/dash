import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../services/schedule.service';
import { Observable } from 'rxjs';
import { Doctor } from '../models/schedule.model'; // Import the Doctor model
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-doctor-vailability',
  standalone: false,
  templateUrl: './doctor-vailability.component.html',
  styleUrl: './doctor-vailability.component.css'
})
export class DoctorVailabilityComponent implements OnInit {
  selectedDoctor: string = '';
  doctors: Doctor[] = [];  // Explicitly typed as Doctor array
  successMessage: string = '';  // Success message

  today: string = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  constructor(private scheduleService: SchedulesService) {}

  ngOnInit(): void {
    this.getSchedules().subscribe(data => {
      console.log(data);  // Log the raw data to inspect its structure
      this.transformScheduleData(data);
    });
  }
  

  // Fetch doctor schedules from the backend
  getSchedules(): Observable<any[]> {
    return this.scheduleService.getSchedules();  // Use scheduleService to get schedules
  }

  // Transform the raw data into a structured format
  transformScheduleData(rawData: any[]): void {
    const doctorsMap = new Map<string, Doctor>();  // Typing the Map

    rawData.forEach(entry => {
      const { id_number, fullname, comment, day, time_period, time, is_red } = entry;

      // Create a new doctor entry if it doesn't exist
      if (!doctorsMap.has(id_number)) {
        doctorsMap.set(id_number, {
          id: id_number,
          fullname: fullname,
          comment: comment,
          isEditMode: false,
          schedules: []
        });
      }

      // Find the doctor and add the schedule
      const doctor = doctorsMap.get(id_number);
      const daySchedule = doctor?.schedules.find(s => s.day === day);

      if (!daySchedule) {
        doctor?.schedules.push({
          day: day,
          morning: [],
          afternoon: []
        });
      }

      // Add the time slot to the appropriate time period
      const schedule = doctor?.schedules.find(s => s.day === day);
      const timeSlot = { time: time, isRed: is_red };

      if (time_period === 'morning') {
        schedule?.morning.push(timeSlot);
      } else if (time_period === 'afternoon') {
        schedule?.afternoon.push(timeSlot);
      }
    });

    // Convert the map back to an array for easier iteration in the template
    this.doctors = Array.from(doctorsMap.values());
  }

  toggleDoctor(doctorId: string): void {
    // If the selected doctor is clicked again, close the schedule
    if (this.selectedDoctor === doctorId) {
      this.selectedDoctor = ''; // Deselect the doctor and hide the schedule
    } else {
      this.selectedDoctor = doctorId; // Select the new doctor and show the schedule
    }
  
  // Optionally, reset edit mode when switching doctors
  this.doctors.forEach(doctor => {
    if (doctor.id === doctorId) {
      doctor.isEditMode = false; // Reset edit mode when selecting a doctor
    }
  })
  
  // Find the selected doctor by ID and toggle isEditMode for the selected one
    const doctor = this.doctors.find(d => d.id === doctorId);
    if (doctor) {
      doctor.isEditMode = false;  // Enable edit mode for the selected doctor
    }
  } 

  toggleTimeColor(schedules: any[], scheduleIndex: number, period: string, timeIndex: number): void {
    const schedule = schedules[scheduleIndex];
    if (schedule) {
      const doctor = this.doctors.find(d => d.schedules === schedules);
      if (doctor?.isEditMode) {
        schedule[period][timeIndex].isRed = !schedule[period][timeIndex].isRed;
      }
    }
  }
  
}
