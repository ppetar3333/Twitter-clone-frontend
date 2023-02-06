import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/@api/services/user.service';

@Component({
  selector: 'twitter-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchText: any;
  public users: Array<any> = [];
  
  constructor(
    private router: Router, 
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getRegularUsers().subscribe((responseRegular) => {
      this.users = responseRegular;

      this.userService.getBusinessUsers().subscribe((responseBusiness: any) => {
        responseBusiness.forEach((element: any) => {
          this.users.push(element);
        });
      })
    })
  }

  public redirectToProfilePage(id: string): void {
    this.router.navigate(['user-profile', id]);
  }
}
