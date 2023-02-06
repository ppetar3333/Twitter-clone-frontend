import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent implements OnInit {

  constructor(private router: Router) { }

  public ngOnInit(): void {
  }

    public redirectUser(): void {
    // if user is logged in redirect to feed page
    // else redirect to login page
    this.router.navigate(['feed']);
  }
}
