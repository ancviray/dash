import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private baseUrl = 'http://localhost:3000/api/schedules'; // Base URL for schedule API

  constructor(private http: HttpClient) {}

  // Fetch doctor schedules from the backend
  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/schedules/get');  // Adjust URL based on your backend
  }

  // Update doctor schedules in the database
  updateDoctorSchedule(doctorId: string, schedules: any[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${doctorId}`, { schedules });
  }

}

