import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Auth } from 'src/app/@api/auth/auth.model';
import { AuthenticationService } from 'src/app/@api/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoading: boolean = false;
  public username: string = '';
  public password: string = '';
  public error = new BehaviorSubject<string>('');
  public _error = this.error.asObservable();

  constructor(
    private router: Router, 
    private authService: AuthenticationService
  ) { }

  public ngOnInit(): void {
    this.fadeIn();
  }

  public fadeIn(): void {
    setTimeout(() => {
      this.isLoading = true;
    }, 50);
  }

  public redirectToRegister(): void {
    this.router.navigate(['registration']);
  }

  public verifyAccount(): void {
    this.router.navigate(['verify-registration']);
  }

  public navigateUserToFeed(): void {
    this.router.navigate(['feed']);
  }

  public getUsername(event: any): void {
    this.username = event;
  }

  public getPassword(event: any): void {
    this.password = event;
  }

  public enableSave(): boolean {
    if (this.username && this.password) {
      return true;
    }
    return false;
  }

  public redirectUserToRecovery(): void {
    this.router.navigate(['recovery-password']);
  }

  public signIn(): void {
    let auth = new Auth(
      this.username,
      this.password
    );

    this.authService.login(auth).subscribe({
      next: (response: any) => {
        if (response.includes('"Wrong Credentials, please check all fields!"') || response.includes('"Your profile is not verified"')) {
          this.error.next(response);
        }
        if (this.error.getValue() === '') {
          this.authService.setLoggedInPassword(this.password);
          this.navigateUserToFeed();
        }
      },
      error: () => {
        this.error.next('Error with our server, please try later.');
      },
      complete: () => {
        console.log('Login complete')
      },
    });
    
    this.error.next('');
  }
}
