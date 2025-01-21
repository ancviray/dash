import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { DoctorVailabilityComponent } from './doctor-vailability/doctor-vailability.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { MedicalAssessmentsComponent } from './dashboard/medical-assessments/medical-assessments.component';
import { DoctorsScheduleComponent } from './dashboard/doctors-schedule/doctors-schedule.component';
import { MedicalRecordsComponent } from './dashboard/medical-records/medical-records.component';
import { HealthCodeSetupComponent } from './dashboard/health-code-setup/health-code-setup.component';
import { UserSetupComponent } from './dashboard/user-setup/user-setup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { DataReportComponent } from './dashboard/data-report/data-report.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DoctorVailabilityComponent,
    VerifyOtpComponent,
    SetupPasswordComponent,
    MedicalAssessmentsComponent,
    DoctorsScheduleComponent,
    MedicalRecordsComponent,
    HealthCodeSetupComponent,
    UserSetupComponent,
    DashboardComponent,
    HeaderComponent,
    DataReportComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
