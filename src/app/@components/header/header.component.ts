import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'twitter-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('disableNav') disableNav: boolean = false;
  
  constructor(private router: Router) { }

  public ngOnInit(): void {
  }

  public redirectUserToHome(): void {
    this.router.navigate(['feed']);
  }
}
