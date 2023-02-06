import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/@api/services/user.service';
import { TokenService } from 'src/app/@core/token/token.service';

@Component({
  selector: 'app-user-requests-dialog',
  templateUrl: './user-requests-dialog.component.html',
  styleUrls: ['./user-requests-dialog.component.scss']
})
export class UserRequestsDialogComponent implements OnInit {
  public requestsList: Array<any> = [];
  public token: any;
  public user: any;
  public isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<UserRequestsDialogComponent>,
  ) { }

  public ngOnInit(): void {
    this.isLoading = true;
    this.token = this.tokenService.decodeToken(JSON.stringify(this.tokenService.getToken()));
    this.getUserByUsername()
  }

  public getUserByUsername(): void {
    this.userService.getRegularUserByUsername(this.token.username).subscribe((response) => {
      if (response.role === 'business') {
        this.userService.getBusinessUserByUsername(this.token.username).subscribe((response) => {
          this.user = response;
          this.getFollowRequests();
        });
      } else {
        this.user = response;
        this.getFollowRequests();
      }
    });
  }

  public getFollowRequests(): void {
    this.userService.getFollowRequests(this.user.id).subscribe((response) => {
      this.requestsList = response;
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public acceptRequest(user: any): void {
    this.userService.acceptRequest(this.user.id, user.id).subscribe((response) => {
      this.isLoading = true;
      this.getFollowRequests();
    })
  }

  public declineRequest(user: any): void {
    this.userService.declineRequest(this.user.id, user.id).subscribe((response) => {
      this.isLoading = true;
      this.getFollowRequests();
    })
  }
}
