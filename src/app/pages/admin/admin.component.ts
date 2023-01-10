import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  auth = new FirebaseTSAuth();
  constructor(private router: Router) {}

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
}
