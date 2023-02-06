import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'twitter-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {
  @Input('recommendationsList') public recommendationsList: Array<any> = [];

  constructor(private router: Router) { }

  public ngOnInit(): void { }

  public redirectToProfilePage(id: string): void {
    this.router.navigate(['user-profile', id]);
  }
}
