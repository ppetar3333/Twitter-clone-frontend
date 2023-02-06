import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from './@core/guards/always-auth-guard';
import { NoAccessGuard } from './@core/guards/no-access.guard';
import { ChangePasswordComponent } from './@pages/change-password/change-password.component';
import { FeedComponent } from './@pages/feed/feed.component';
import { HomeComponent } from './@pages/home/home.component';
import { LoginComponent } from './@pages/login/login.component';
import { NoAccessComponent } from './@pages/no-access/no-access.component';
import { NotFoundComponent } from './@pages/not-found/not-found.component';
import { RecoveryPasswordComponent } from './@pages/recovery-password/recovery-password.component';
import { RegisterComponent } from './@pages/register/register.component';
import { UserProfileComponent } from './@pages/user-profile/user-profile.component';
import { VerifyRegistrationComponent } from './@pages/verify-registration/verify-registration.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAccessGuard],
  },
  {
    path: 'registration',
    component: RegisterComponent,
    canActivate: [NoAccessGuard],
  },
  {
    path: 'feed',
    component: FeedComponent,
    canActivate: [CanActivateAuthGuard],
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [CanActivateAuthGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [CanActivateAuthGuard],
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent,
    canActivate: [NoAccessGuard],
  },
  {
    path: 'verify-registration',
    component: VerifyRegistrationComponent,
    canActivate: [NoAccessGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'no-access',
    component: NoAccessComponent
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
