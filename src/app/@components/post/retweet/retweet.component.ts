import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TweetService } from 'src/app/@api/services/tweet.service';
import { UserService } from 'src/app/@api/services/user.service';
import { TokenService } from 'src/app/@core/token/token.service';

@Component({
  selector: 'app-retweet',
  templateUrl: './retweet.component.html',
  styleUrls: ['./retweet.component.scss']
})
export class RetweetComponent implements OnInit {
  public tweetDesc: string = '';
  public token: any;
  public user: any;
  public userId: string = '';
  public firstname: string = '';
  public lastname: string = '';
  public username: string = '';
  public company: string = '';
  public tweet: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tweetService: TweetService,
    private tokenService: TokenService,
    private userService: UserService,
    private dialogRef: MatDialogRef<RetweetComponent>
  ) { }

  public ngOnInit(): void {
    this.tweet = this.data.tweet;
    this.token = this.tokenService.decodeToken(JSON.stringify(this.tokenService.getToken()));
    this.username = this.token.username;
    this.getLoggedInUser();
  }

  public getLoggedInUser(): void {
    this.userService.getRegularUserByUsername(this.username).subscribe((response) => {
      if (response.role === 'business') {
        this.userService.getBusinessUserByUsername(this.username).subscribe((response) => {
          this.user = response;
          this.prepareData();
        });
      } else {
        this.user = response;
        this.prepareData();
      }
    })
  }

  public prepareData(): void {
    if (this.user.firstname && this.user.lastname) {
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
    }
    if (this.user.company) {
      this.company = this.user.company;
    }
  }

  public closeDialog(event: boolean): void {
    this.dialogRef.close(event);
  }

  public enableSave(): boolean {
    if (this.tweetDesc) {
      return true;
    }
    return false;
  }

  public getTweetDesc(event: any): void {
    this.tweetDesc = event;
  }

  public retweet(): void {

    let request = {
      "text": this.tweetDesc,
      "likes": [],
      "tweet": this.tweet.id,
      "user": {
        "id": this.user.id,
        "username": this.user.username
      }
    }

    this.tweetService.createTweet(request).subscribe((response) => {
      if (response) {
        this.closeDialog(true);
      }
    })
  }
}
