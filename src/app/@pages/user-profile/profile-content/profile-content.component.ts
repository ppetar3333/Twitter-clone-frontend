import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/@api/services/user.service';
import { DialogMessageComponent } from 'src/app/@components/dialog-message/dialog-message.component';
import { TokenService } from 'src/app/@core/token/token.service';
import { ProfileFollowersComponent } from '../profile-followers/profile-followers.component';

@Component({
  selector: 'twitter-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  @Input('isLoggedIn') public loggedInUser: boolean = false;
  public profileVisibility: string = '';
  public changeVisibilityBtn: string = '';
  public user: any;
  public userId: string = '';
  public isLoading: boolean = false;
  private token: any;
  public listOfFollowing: Array<any> = [];
  public listOfFollowers: Array<any> = [];
  @Input('tweetsList') tweetsList: Array<any> = [];
  @Output('isLiked') isLiked = new EventEmitter<boolean>();
  @Output('isRetweeted') isRetweeted = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void { 
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.token = this.tokenService.decodeToken(JSON.stringify(this.tokenService.getToken()));
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.getUserById();
  }

  public getUserById(): void {
    this.userService.getRegularUserByID(this.userId).subscribe((response) => {
      if (response.role === 'business') {
        this.userService.getBusinessUserByID(this.userId).subscribe((response) => {
          this.user = response;
          this.getListOfFollowing();
          this.getListOfFollowers();
        });
      } else {
        this.user = response;
        this.getListOfFollowing();
        this.getListOfFollowers();
      }
    })
  }

  public getListOfFollowing(): void {
    this.userService.getAllFollowing(this.user.id).subscribe((response) => {
      this.listOfFollowing = response;
    })
  }

  public getListOfFollowers(): void {
    this.userService.getAllFollowers(this.user.id).subscribe((response) => {
      this.listOfFollowers = response;
    })
  }
  
  public changeProfileVisibility(): void {
    this.userService.updateProfileVisibility(this.user, this.userId).subscribe(() => {
      this.dialog.open(DialogMessageComponent, {
        data: {
          title: 'Profile Visibility',
          body: `Your profile visibility has successfully changed`,
          button: 'Close'
        },
      }).afterClosed().subscribe(() => {
        this.getUserById();
      });
    })
  }

  public showFollowers(): void {
    this.dialog.open(ProfileFollowersComponent, {
      data: {
        title: 'List Of Followers',
        body: this.listOfFollowers,
        button: 'Close'
      },
    });
  }

  public showFollowing(): void {
    this.dialog.open(ProfileFollowersComponent, {
      data: {
        title: 'List Of Following',
        body: this.listOfFollowing,
        button: 'Close'
      },
    });
  }

  public isRetweetHappened(event: any): void {
    if (event) {
      this.isRetweeted.emit(true);
    }
  }

  public isLikedHappened(event: any): void {
    if (event) {
      this.isLiked.emit(true);
    }
  }
}
