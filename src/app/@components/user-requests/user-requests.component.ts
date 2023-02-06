import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRequestsDialogComponent } from './user-requests-dialog/user-requests-dialog.component';

@Component({
  selector: 'twitter-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  public ngOnInit(): void {
  }

  public showRequests(): void {
    this.dialog.open(UserRequestsDialogComponent).afterClosed().subscribe(() => {
    });
  }
}
