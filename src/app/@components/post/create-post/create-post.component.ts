import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TweetService } from 'src/app/@api/services/tweet.service';
import { UserService } from 'src/app/@api/services/user.service';
import { TokenService } from 'src/app/@core/token/token.service';

@Component({
  selector: 'twitter-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public tweetDesc: string = '';
  public token: any;
  public user: any;
  public userId: string = '';
  public firstname: string = '';
  public lastname: string = '';
  public username: string = '';
  public company: string = '';
  @Output('postCreated') postCreated = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private tweetService: TweetService,
    private tokenService: TokenService
  ) { }

  public ngOnInit(): void {
    this.token = this.tokenService.decodeToken(JSON.stringify(this.tokenService.getToken()));
    this.username = this.token.username;
    this.getUserById();
  }

  public getUserById(): void {
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

  public getTweetDesc(event: any): void {
    this.tweetDesc = event;
  }

  public enableSave(): boolean {
    if (this.tweetDesc) {
      return true;
    }
    return false;
  }

  public createTweet(): void {

    let request = {
      "text": this.tweetDesc,
      "likes": [],
      "tweet": null,
      "user": {
        "id": this.user.id,
        "username": this.user.username
      }
    }

    this.tweetService.createTweet(request).subscribe((response) => {
      this.postCreated.emit(true);
    })
  }
}
