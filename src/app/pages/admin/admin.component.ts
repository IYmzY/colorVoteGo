import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoomComponent } from 'src/app/components/create-room/create-room.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  auth = new FirebaseTSAuth();
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (!this.auth.isSignedIn()) {
      this.router.navigate(['']);
    }
  }

  onLogoutClick() {
    this.auth.signOut();
    if (this.auth.isSignedIn()) {
      return;
    } else {
      this.router.navigate(['']);
    }
  }

  onRoomCreate() {
    this.dialog.open(CreateRoomComponent);
  }
}
