import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/@api/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isLoading: boolean = false;
  public username: string = '';
  public password: string = '';
  public name: string = '';
  public surname: string = '';
  public age: string = '';
  public gender: string = '';
  public city: string = '';
  public gendersList: Array<any> = [];
  public businessAcc: boolean = false;
  public email: string = '';
  public companyName: string = '';
  public website: string = '';
  public error = new BehaviorSubject<string>('');
  public _error = this.error.asObservable();
  public captcha: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  public ngOnInit(): void {
    this.fadeIn();
    this.getGenders();
  }

  public fadeIn(): void {
    setTimeout(() => {
      this.isLoading = true;
    }, 50);
  }

  public handleSuccess(event: any): void {
    this.captcha = event;
    console.log(this.captcha)
  }

  public getGenders(): void {
    this.gendersList.push('Male', 'Female');
  }

  public redirectToLogin(): void {
    this.router.navigate(['login']);
  }

  public continueAsGuest(): void {
    this.router.navigate(['feed']);
  }

  public getUsername(event: any): void {
    this.username = event;
  }

  public getPassword(event: any): void {
    this.password = event;
  }

  public getName(event: any): void {
    this.name = event;
  }

  public getSurname(event: any): void {
    this.surname = event;
  }

  public getAge(event: any): void {
    this.age = event;
  }

  public getGender(event: any): void {
    this.gender = event;
  }

  public getCity(event: any): void {
    this.city = event;
  }

  public getEmail(event: any): void {
    this.email = event;
  }

  public getCompanyName(event: any): void {
    this.companyName = event;
  }

  public getWebsite(event: any): void {
    this.website = event;
  }

  public switchAccounts(): void {
    this.businessAcc = !this.businessAcc; 
    this.resetFields();
  }

  public resetFields(): void {
    this.username = '';
    this.password = '';
    this.name = '';
    this.surname = '';
    this.gender = '';
    this.age = '';
    this.city = '';
    this.email = '';
    this.companyName = '';
    this.website = '';
    this.captcha = '';
  }

  public enableSave(): boolean {
    let fieldsStatus = false;

    if (this.businessAcc) {
      if (this.username && this.password && this.email && this.companyName && this.website && this.captcha) {
        fieldsStatus = true;
      } else {
        fieldsStatus = false;
      }
    } else {
      if (this.username && this.password && this.name && this.surname && this.gender && this.age && this.city && this.captcha) {
        fieldsStatus = true;
      } else {
        fieldsStatus = false;
      }
    } 

    return fieldsStatus;
  }

  public register(): void {

    let request = {}
    let role = ''

    if (!this.businessAcc) {
      role = 'regular'
      request = {
        "password": this.password,
        "username": this.username,
        "email": this.email,
        "firstname": this.name,
        "lastname": this.surname,
        "city": this.city,
        "gender": this.gender.toLowerCase(),
        "age": this.age
      }
    } else {
      role = 'business'
      request = {
        "username": this.username,
        "email": this.email,
        "company": this.companyName,
        "password": this.password,
        "website": this.website
      }
    }

    if (role === 'business') {
      this.authService.registerBusiness(request, role).subscribe({
        next: (response) => {
          if (response) {
            this.error.next(response);
          }
          if (response.includes('"InsertedID"')) {
            this.redirectToLogin();
          }
        },
        error: (err) => {
          if (err) {
            this.error.next("Username exists!");
          }
        },
        complete: () => {
          console.log('Register complete');
        }
      });
  
      this.error.next('');
    } else {
      this.authService.registerRegular(request, role).subscribe({
        next: (response) => {
          if (response) {
            this.error.next(response);
          }
          if (response.includes('"InsertedID"')) {
            this.redirectToLogin();
          }
        },
        error: (err) => {
          console.log(err)
          if (err) {
            this.error.next("Error with our server, please try later.");
          }
        },
        complete: () => {
          console.log('Register complete');
        }
      });
  
      this.error.next('');
    }
  }
}
