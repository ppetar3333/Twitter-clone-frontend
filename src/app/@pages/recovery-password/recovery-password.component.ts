import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/@api/services/user.service';
import { TokenService } from 'src/app/@core/token/token.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  public password: string = '';
  public passwordRepeat: string = '';
  public error = new BehaviorSubject<string>('');
  public _error = this.error.asObservable();
  public success = new BehaviorSubject<string>('');
  public _success = this.error.asObservable();
  public email: string = '';
  public code: number = 0;
  public codeRecived: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService,
  ) { }

  public ngOnInit(): void { }

  public getPassowrd(event: any): void {
    this.password = event;
  }

  public getRepeatPassword(event: any): void {
    this.passwordRepeat = event;
  }

  public getEmail(event: any): void {
    this.email = event;
  }

  public getCode(event: any): void {
    this.code = event;
  }

  public enableSave(): boolean {
    if (this.email && this.code && this.password && this.passwordRepeat) {
      return true;
    }
    return false;
  }

  public enableSaveCode(): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      return true;
    }
    return false;
  }

  public sendCode(): void {
    this.success.next('Sending email...');
    this.userService.sendCodeForRecovery(this.email).subscribe({
      next: () => {
        console.log('Success'); 
      },
      error: (error) => {
        this.error.next(error.error)
        setTimeout(() => {
          this.error.next('');
          this.success.next('');
        }, 1500);
      },
      complete: () => {
        console.log('Completed');
        setTimeout(() => {
          this.codeRecived = true;
        }, 500);
      }
    });
  }

  public saveChanges(): void {
    let error = false;

    let request = {
      "email": this.email,
      "code": String(this.code),
      "new_password": this.password
    }

    if (this.password !== this.passwordRepeat) {
      this.error.next('Passwords needs to match!');
      error = true;
      setTimeout(() => {
        this.error.next('')
      }, 1500);
    }

    if (!error) {
      this.userService.recoveryPassword(request).subscribe({
        next: (response) => {
          this.success.next('Successfully password recovered!');
          if (response.includes('Successfully password recovered!')) {
            setTimeout(() => {
              this.router.navigate(['login'])
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
}
