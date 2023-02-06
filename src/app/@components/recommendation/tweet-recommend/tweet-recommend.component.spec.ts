import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetRecommendComponent } from './tweet-recommend.component';

describe('TweetRecommendComponent', () => {
  let component: TweetRecommendComponent;
  let fixture: ComponentFixture<TweetRecommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetRecommendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
