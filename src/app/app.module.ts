import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './@pages/home/home.component';
import { LoginComponent } from './@pages/login/login.component';
import { RegisterComponent } from './@pages/register/register.component';
import { DialogMessageComponent } from './@components/dialog-message/dialog-message.component';
import { HeaderComponent } from './@components/header/header.component';
import { FooterComponent } from './@components/footer/footer.component';
import { NavComponent } from './@components/nav/nav.component';
import { ToastBarComponent } from './@components/toast-bar/toast-bar.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './@core/interceptors/jwt-interceptors';
import { CommonUiModule } from './@ui/common-ui.module';
import { DateAgoPipe } from './@core/pipes/date-ago.pipe';
import { NoAccessComponent } from './@pages/no-access/no-access.component';
import { TwitterInputComponent } from './@components/twitter-input/twitter-input.component';
import { ProgressComponent } from './@components/progress/progress.component';
import { FormsModule } from '@angular/forms';
import { MatInputComponent } from './@components/mat-input/mat-input.component';
import { FeedComponent } from './@pages/feed/feed.component';
import { NotFoundComponent } from './@pages/not-found/not-found.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { PostComponent } from './@components/post/post.component';
import { RecommendationComponent } from './@components/recommendation/recommendation.component';
import { TweetRecommendComponent } from './@components/recommendation/tweet-recommend/tweet-recommend.component';
import { UserProfileComponent } from './@pages/user-profile/user-profile.component';
import { ListOfLikesDialogComponent } from './@components/post/list-of-likes-dialog/list-of-likes-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { CreatePostComponent } from './@components/post/create-post/create-post.component';
import { ProfileContentComponent } from './@pages/user-profile/profile-content/profile-content.component';
import { SearchComponent } from './@components/search/search.component';
import { FilterPipe } from './@core/pipes/filter.pipe';
import { UserRequestsComponent } from './@components/user-requests/user-requests.component';
import { UserRequestsDialogComponent } from './@components/user-requests/user-requests-dialog/user-requests-dialog.component';
import { ProfileFollowersComponent } from './@pages/user-profile/profile-followers/profile-followers.component';
import { RetweetComponent } from './@components/post/retweet/retweet.component';
import { ChangePasswordComponent } from './@pages/change-password/change-password.component';
import { RecoveryPasswordComponent } from './@pages/recovery-password/recovery-password.component';
import { VerifyRegistrationComponent } from './@pages/verify-registration/verify-registration.component';
import { LetterDirective } from './@core/directives/letter-only.directive';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DialogMessageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ToastBarComponent,
    DateAgoPipe,
    NoAccessComponent,
    TwitterInputComponent,
    ProgressComponent,
    MatInputComponent,
    FeedComponent,
    NotFoundComponent,
    PostComponent,
    RecommendationComponent,
    TweetRecommendComponent,
    UserProfileComponent,
    ListOfLikesDialogComponent,
    CreatePostComponent,
    ProfileContentComponent,
    SearchComponent,
    FilterPipe,
    UserRequestsComponent,
    UserRequestsDialogComponent,
    ProfileFollowersComponent,
    RetweetComponent,
    ChangePasswordComponent,
    RecoveryPasswordComponent,
    VerifyRegistrationComponent,
    LetterDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonUiModule,
    NgxCaptchaModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DigitOnlyModule,
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: { 
        hasBackdrop: true
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
