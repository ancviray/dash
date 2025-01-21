import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorVailabilityComponent } from './doctor-vailability/doctor-vailability.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { MedicalAssessmentsComponent } from './dashboard/medical-assessments/medical-assessments.component';
import { HealthCodeSetupComponent } from './dashboard/health-code-setup/health-code-setup.component';
import { UserSetupComponent } from './dashboard/user-setup/user-setup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsScheduleComponent } from './dashboard/doctors-schedule/doctors-schedule.component';
import { MedicalRecordsComponent } from './dashboard/medical-records/medical-records.component';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard
import { DataReportComponent } from './dashboard/data-report/data-report.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctors-availability', component: DoctorVailabilityComponent },
  { path: 'verify-otp', component: VerifyOtpComponent} , 
  { path: 'setup-password', component: SetupPasswordComponent},
  { path: 'medical-assessments', component: MedicalAssessmentsComponent},
  { path: 'doctors-schedule', component: DoctorsScheduleComponent},
  { path: 'health-code', component: HealthCodeSetupComponent},
  { path: 'user-setup', component: UserSetupComponent},
  { path: 'dashboard', component:  DashboardComponent},
  { path: 'data-report', component: DataReportComponent},
  { path: 'medical-records', component: MedicalRecordsComponent},
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: '**', redirectTo: 'login' } // Wildcard route to handle undefined paths

];


@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
