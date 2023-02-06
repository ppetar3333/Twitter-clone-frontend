import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/@api/services/user.service';

@Component({
  selector: 'app-verify-registration',
  templateUrl: './verify-registration.component.html',
  styleUrls: ['./verify-registration.component.scss']
})
export class VerifyRegistrationComponent implements OnInit {
  public verificationCode: number = 0;
  public error = new BehaviorSubject<string>('');
  public _error = this.error.asObservable();
  public isLoading: boolean = false;
  public username: string = '';
  public password: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.fadeIn();
  }

  public fadeIn(): void {
    setTimeout(() => {
      this.isLoading = true;
    }, 50);
  }

  public getVerificationCode(event: any): void {
    this.verificationCode = event;
  }

  public getUsername(event: any): void {
    this.username = event;
  }

  public getPassword(event: any): void {
    this.password = event;
  }

  public enableSave(): boolean {
    if (this.verificationCode && this.username && this.password) {
      return true;
    }
    return false;
  }

  public redirectToLogin(): void {
    this.router.navigate(['login']);
  }
  
  public checkVerificationCode(): void {
    let request = {
      "username": this.username,
      "password": this.password,
      "code": this.verificationCode
    }

    this.userService.verifyRegistration(request).subscribe({
      next: (response) => {
        console.log(response)
        if (response === "Code is valid, you are verified") {
          this.router.navigate(['login']);
        } else {
          this.error.next(response);
          setTimeout(() => {
            this.error.next('');
          }, 1500);
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Completed')
      }
    })
  }
}
