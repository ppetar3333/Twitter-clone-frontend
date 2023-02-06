import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'twitter-profile-followers',
  templateUrl: './profile-followers.component.html',
  styleUrls: ['./profile-followers.component.scss']
})
export class ProfileFollowersComponent implements OnInit {
  public body: Array<any> = [];
  public title: string = '';
  public button: string = '';

  constructor(
    public dialogRef: MatDialogRef<ProfileFollowersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public ngOnInit(): void {
    this.body = this.data.body; 
    this.title = this.data.title; 
    this.button = this.data.button; 
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
