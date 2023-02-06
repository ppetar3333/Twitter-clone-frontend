import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/@api/services/user.service';
import { TokenService } from 'src/app/@core/token/token.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public currentPassword: string = '';
  public newPassword: string = '';
  public token: any;
  public error = new BehaviorSubject<string>('');
  public _error = this.error.asObservable();
  public success = new BehaviorSubject<string>('');
  public _success = this.error.asObservable();
  public user: any;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.token = this.tokenService.decodeToken(JSON.stringify(this.tokenService.getToken()));
    this.getLoggedInUser();
  }

  public getLoggedInUser(): void {
    this.userService.getRegularUserByUsername(this.token.username).subscribe((response) => {
      if (response.role === 'business') {
        this.userService.getBusinessUserByUsername(this.token.username).subscribe((response) => {
          this.user = response;
        });
      } else {
        this.user = response;
      }
    })
  }

  public getCurrentPassowrd(event: any): void {
    this.currentPassword = event;
  }

  public getNewPassword(event: any): void {
    this.newPassword = event;
  }

  public enableSave(): boolean {
    if (this.currentPassword && this.newPassword) {
      return true;
    }
    return false;
  }

  public saveChanges(): void {
    let request = {
      "current_password": this.currentPassword,
      "new_password": this.newPassword
    }

    this.userService.changePassword(request, this.user.username).subscribe({
      next: (response) => {
        if (response.includes('Successful change password!')) {
          this.success.next('Successful change password!');
          setTimeout(() => {
            this.router.navigate(['feed'])
            this.success.next('');         
          }, 1500);
        }
      },
      error: (error) => {
        this.error.next(error.error)
        setTimeout(() => {
          this.error.next('')
        }, 1500);
      },
      complete: () => {
        console.log('Completed')
      }
    })
  }
}
