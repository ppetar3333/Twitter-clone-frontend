import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  public ngOnInit(): void { }

  public redirectUser(): void {
    // if user is logged in redirect to feed page
    // else redirect to login page
    this.router.navigate(['feed']);
  }
}
