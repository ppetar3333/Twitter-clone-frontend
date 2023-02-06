 import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/@api/auth/authentication.service';
import { UserService } from 'src/app/@api/services/user.service';
import { TokenService } from 'src/app/@core/token/token.service';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';

@Component({
  selector: 'twitter-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ 
        height: '100vh', 
        visibility: 'visible'
      })),
      state('true', style({ 
        height: '0', 
        visibility: 'hidden' 
      })),
      transition('false => true', animate('500ms ease-in')),
      transition('true => false', animate('500ms ease-out'))
    ])
  ]
})
export class NavComponent implements OnInit {
  public user: any;
  public collapse: boolean = true;
  private token: any;

  constructor(
    private el: ElementRef, 
    private router: Router,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private userService: UserService,
    private authService: AuthenticationService
  ) { }

  public ngOnInit(): void { }

  public toggleCollapse(): void {
    this.handleActiveClass();
    this.collapse = !this.collapse;
    this.getLoggedInUser();
  }

  public getLoggedInUser(): void {
    this.token = this.tokenService.decodeToken(JSON.stringify(this.tokenService.getToken()));
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

  public redirectUser(endpoint: string): void {
    this.toggleCollapse();
    setTimeout(() => {
      switch (endpoint) {
        case 'home':
          this.router.navigate(['feed']);
          break;
        case 'user-profile':
          this.router.navigate(['user-profile', this.user.id]);
          break; 
        case 'change-password':
          this.router.navigate(['change-password']);
          break;  
        case 'logout':
          this.logoutUser();
          break; 
      }
    }, 550);
  }

  public handleActiveClass(): void {
    let myTag = this.el.nativeElement.querySelector(".hamburger");
    myTag.classList.forEach((element: any) => {
      if (element.includes('is-active')) {
        myTag.classList.remove('is-active');
      } else {
        myTag.classList.add('is-active');
      }
    });
  }

  public logoutUser(): void {
    this.dialog.open(DialogMessageComponent, {
      data: {
        title: 'Logout',
        body: 'You have successfully loged out.',
        button: 'Close'
      },
    }).afterClosed().subscribe((data) => {
      this.authService.logout();
      this.router.navigate(['login']);
    });
  }
}
