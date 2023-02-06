import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/@api/services/tweet.service';
import { UserService } from 'src/app/@api/services/user.service';
import { TokenService } from 'src/app/@core/token/token.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public isLoading: boolean = false;
  public token: any;
  public user: any;
  public tweetsList: Array<any> = [];
  public recommendationsList: Array<any> = [];

  constructor(
    private tokenService: TokenService,
    private tweetService: TweetService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.token = this.tokenService.decodeToken(JSON.stringify(this.tokenService.getToken()));
    this.isLoading = true;
    this.getLoggedInUser();
  }

  public getLoggedInUser(): void {
    this.userService.getRegularUserByUsername(this.token.username).subscribe((response) => {
      if (response.role === 'business') {
        this.userService.getBusinessUserByUsername(this.token.username).subscribe((response) => {
          this.user = response;
          this.getAllTweetsForLoggedInUser();
          this.getRecommendations();
        });
      } else {
        this.user = response;
        this.getAllTweetsForLoggedInUser();
        this.getRecommendations();
      }
    })
  }

  public getAllTweetsForLoggedInUser(): void {
    this.tweetService.getTweetsForFeedPageByUser(this.user.id).subscribe((response) => {
      this.tweetsList = response;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    })
  }

  public getRecommendations(): void {
    this.userService.getRecommendationsForUser(this.user.id).subscribe((response) => {
      this.recommendationsList = response;
    })
  }

  public isPostCreated(event: any): void {
    if (event) {
      this.isLoading = true;
      this.getAllTweetsForLoggedInUser();
    }
  }

  public isRetweeted(event: any): void {
    if (event) {
      this.isLoading = true;
      this.getLoggedInUser();
    }
  }

  public isLiked(event: any): void {
    if (event) {
      this.isLoading = true;
      this.getLoggedInUser();
    }
  }
}
