import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { AuthGuard } from './shared/guard/authGaurd';
import { LayoutComponent } from './shared/layout/layout.component';
import { content } from './shared/routes/content-routes';
import { VerifyComponent } from './Pages/verify/verify.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'verify', component: VerifyComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: content,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
