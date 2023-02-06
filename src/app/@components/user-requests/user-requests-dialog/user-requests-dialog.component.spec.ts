import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestsDialogComponent } from './user-requests-dialog.component';

describe('UserRequestsDialogComponent', () => {
  let component: UserRequestsDialogComponent;
  let fixture: ComponentFixture<UserRequestsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
