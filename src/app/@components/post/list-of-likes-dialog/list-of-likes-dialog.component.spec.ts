import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLikesDialogComponent } from './list-of-likes-dialog.component';

describe('ListOfLikesDialogComponent', () => {
  let component: ListOfLikesDialogComponent;
  let fixture: ComponentFixture<ListOfLikesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfLikesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfLikesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
