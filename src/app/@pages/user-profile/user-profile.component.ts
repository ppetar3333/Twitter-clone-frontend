import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from 'src/app/@api/services/tweet.service';
import { UserService } from 'src/app/@api/services/user.service';
import { TokenService } from 'src/app/@core/token/token.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public isLoading: boolean = false;
  public isLoggedIn: boolean = false;
  private userId: any;
  public userProfile: any;
  private token: any;
  public loggedInUser: any;
  public followStatus: string = "";
  public pending: boolean = false;
  public isLoadingFollow: boolean = false;
  public isLoadingUnfollow: boolean = false;
  public isLoadingRequest: boolean = false;
  public tweetsList: Array<any> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private tweetService: TweetService,
    private userService: UserService
  ) { }

  public ngOnInit(): void { 
    this.userProfileInit();
  }

  public userProfileInit(): void {
    this.isLoading = true;
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.token = this.tokenService.decodeToken(JSON.stringify(this.tokenService.getToken()));
    this.getLoggedInUser();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  public valueChange(event: any): void {
    this.isLoggedIn = event;
  }

  public follow(): void {
    this.isLoadingFollow = true;
    this.userService.followUser(this.loggedInUser.id, this.userProfile.id).subscribe(() => {
      this.checkRelationship();
    })
  }

  public unfollow(): void {
    this.isLoadingUnfollow = true;
    this.userService.unfollowUser(this.loggedInUser.id, this.userProfile.id).subscribe(() => {
      this.checkRelationship();
    })
  }

  public sendRequest(): void {
    this.isLoadingRequest = true;
    this.userService.followRequest(this.loggedInUser.id, this.userProfile.id).subscribe(() => {
      this.checkRelationship();
    })
  }

  public getLoggedInUser(): void {
    this.userService.getRegularUserByUsername(this.token.username).subscribe((response) => {
      if (response.role === 'business') {
        this.userService.getBusinessUserByUsername(this.token.username).subscribe((response) => {
          this.loggedInUser = response;
          this.getProfileOfUser();
        });
      } else {
        this.loggedInUser = response;
        this.getProfileOfUser();
      }
    })
  }

  public getProfileOfUser(): void {
    this.userService.getRegularUserByID(this.userId).subscribe((response) => {
      if (response.role === 'business') {
        this.userService.getBusinessUserByID(this.userId).subscribe((response) => {
          this.userProfile = response;
          this.checkUser();
        });
      } else {
        this.userProfile = response;
        this.checkUser();
      }
    })
  }

  public checkUser(): void {
    this.checkRelationship();
    if (this.token.username === this.userProfile.username) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  public checkRelationship(): void {
    this.userService.checkIsFollowing(this.loggedInUser.id, this.userProfile.id).subscribe((response) => {
      this.followStatus = response;
      this.getAllTweetsForUser();
      setTimeout(() => {
        this.isLoadingFollow = false;
        this.isLoadingUnfollow = false;
        this.isLoadingRequest = false;
      }, 1000);
    })
  }

  public getAllTweetsForUser(): void {
    let userProfileId = ""

    if (this.userProfile) {
      userProfileId = this.userProfile.id;
    } else {
      userProfileId = this.loggedInUser.id;
    }

    this.tweetService.getTweetsForUsersPage(userProfileId, this.loggedInUser.id).subscribe((response) => {
      this.tweetsList = response;
    })
  }

  public isLiked(event: any): void {
    if (event) {
      this.userProfileInit();
    }
  }

  public isRetweeted(event: any): void {
    if (event) {
      this.userProfileInit();
    }
  }
}
