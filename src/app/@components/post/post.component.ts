import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TweetService } from 'src/app/@api/services/tweet.service';
import { UserService } from 'src/app/@api/services/user.service';
import { TokenService } from 'src/app/@core/token/token.service';
import { ListOfLikesDialogComponent } from './list-of-likes-dialog/list-of-likes-dialog.component';
import { RetweetComponent } from './retweet/retweet.component';

@Component({
  selector: 'twitter-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public listOfLikes: Array<any> = [];
  public likeStatus: string = '';
  public loggedInUser: any;
  public token: any;
  @Input('tweet') public tweet: any;
  @Input('tweetWidth') tweetWidth: number = 550;
  @Output('retweeted') retweeted = new EventEmitter<boolean>();
  @Output('isLiked') isLiked = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private tweetService: TweetService,
    private dialog: MatDialog
  ) { 
    this.likeStatus = 'like';
  }

  public ngOnInit(): void {
    this.getLoggedInUser();
  }

  public getLoggedInUser(): void {
    this.token = this.tokenService.decodeToken(JSON.stringify(this.tokenService.getToken()));
    this.userService.getRegularUserByUsername(this.token.username).subscribe((response) => {
      if (response.role === 'business') {
        this.userService.getBusinessUserByUsername(this.token.username).subscribe((response) => {
          this.loggedInUser = response;
        });
      } else {
        this.loggedInUser = response;
      }
    })
  }

  public retweet(tweet: any): void {
    this.dialog.open(RetweetComponent, {
      data: {
        tweet: tweet,
      },
    }).afterClosed().subscribe((data) => {
      if (data) { 
        this.retweeted.emit(true);
      }
    });
  }

  public showLikes(tweet: any): void {
    this.dialog.open(ListOfLikesDialogComponent, {
      data: {
        title: 'List Of Likes',
        body: tweet.likes,
        button: 'Close'
      },
    });
  }

  public likePost(tweet: any): void {
    this.tweetService.likeUnlikeTweet(tweet.id, this.loggedInUser.id).subscribe((response) => {
      if (response) {
        this.isLiked.emit(true);
        if (this.likeStatus === 'like') {
          this.likeStatus = 'liked';
        } else {
          this.likeStatus = 'like';
        }
      }
    })
  }

  public goToUserProfile(userid: string): void {
    this.router.navigate(['user-profile', userid]);
  }

  public reaction(event: any): void {
    if (event) {
      this.isLiked.emit(true);
    } 
  }
}
