import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../../services/schedule.service';
import { Observable } from 'rxjs';
import { Doctor } from '../../models/schedule.model'; // Import the Doctor model
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-doctors-schedule',
  standalone: false,
  templateUrl: './doctors-schedule.component.html',
  styleUrls: ['./doctors-schedule.component.css']
})
export class DoctorsScheduleComponent implements OnInit {
  selectedDoctor: string = '';
  doctors: Doctor[] = [];  // Explicitly typed as Doctor array
  successMessage: string = '';  // Success message

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

  saveDoctorSchedule(doctorId: string): void {
    const doctor = this.doctors.find(d => d.id === doctorId);
  
    if (doctor) {
      const updatedSchedules = doctor.schedules.map(schedule => ({
        day: schedule.day,
        morning: schedule.morning.map(timeSlot => ({
          time: timeSlot.time,
          isRed: timeSlot.isRed
        })),
        afternoon: schedule.afternoon.map(timeSlot => ({
          time: timeSlot.time,
          isRed: timeSlot.isRed
        }))
      }));
  
      // Call the backend to save the data
      this.scheduleService.updateDoctorSchedule(doctorId, updatedSchedules).subscribe({
        next: response => {
          console.log('Schedule updated successfully', response);
          doctor.isEditMode = false; // Exit edit mode after saving
          this.successMessage = 'Schedule updated successfully!';
          this.showSuccessModal();
        },
        error: error => {
          console.error('Error updating schedule', error);
        }
      });
    }
  }
  
    showSuccessModal(): void {
      const successModal = new bootstrap.Modal(document.getElementById('successModal') as HTMLElement);
      successModal.show();
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
  

  toggleEditMode(doctorId: string): void {
    const doctor = this.doctors.find(d => d.id === doctorId);
    if (doctor) {
      doctor.isEditMode = !doctor.isEditMode;
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
