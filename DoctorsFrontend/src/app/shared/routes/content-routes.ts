import { Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { AdminAndDoctorGuard } from '../guard/adminAndDoctor.guard';
import { PatientGuard } from '../guard/patientGaurd';

export const content: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'doctors',
    loadChildren: () =>
      import('../../doctors/doctors.module').then((m) => m.DoctorsModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('../../patients/patients.module').then((m) => m.PatientsModule),
    canActivate: [AdminAndDoctorGuard],
  },
  {
    path: 'dashboard/abnormal-patients',
    loadChildren: () =>
      import('../../patient-abnormal-report/patient-abnormal-report.module').then((m) => m.PatientAbnormalReportModule),
    canActivate: [AdminAndDoctorGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AdminAndDoctorGuard],
  },
  {
    path: 'analitics',
    loadChildren: () =>
      import('../../analitics/analitics.module').then((m) => m.AnaliticsModule),
    canActivate: [AdminAndDoctorGuard],
  },
  {
    path: 'medical-data',
    loadChildren: () =>
      import('../../medical-data/medical-data.module').then(
        (m) => m.MedicalDataModule
      ),
    canActivate: [PatientGuard],
  },
];
