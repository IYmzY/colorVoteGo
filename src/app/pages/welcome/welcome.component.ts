import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  auth = new FirebaseTSAuth();

  panelOpenState: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // redirect admin to admin page if connected
    if (this.auth.isSignedIn()) {
      console.log('signed ?');
      this.router.navigate(['admin']);
    }
  }
}
