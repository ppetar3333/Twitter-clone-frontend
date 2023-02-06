import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/@api/services/user.service';

@Component({
  selector: 'app-list-of-likes-dialog',
  templateUrl: './list-of-likes-dialog.component.html',
  styleUrls: ['./list-of-likes-dialog.component.scss']
})
export class ListOfLikesDialogComponent implements OnInit {
  public body: Array<any> = [];
  public title: string = '';
  public button: string = '';
  public usersLiked: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<ListOfLikesDialogComponent>,
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public ngOnInit(): void {
    this.body = this.data.body; 
    this.title = this.data.title; 
    this.button = this.data.button; 
    this.getListOfUsers();
  }

  public getListOfUsers(): void {
    this.userService.getUsersByIds(this.body).subscribe((response) => {
      this.usersLiked = response;
    })
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public goToUserProfile(userid: string): void {
    this.closeDialog();
    this.router.navigate(['user-profile', userid]);
  }
}
