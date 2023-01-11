import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'festivApp';

  auth = new FirebaseTSAuth();

  firestore = new FirebaseTSFirestore();

  responsiveViewHeight: number;

  constructor(private router: Router) {
    // // redirect admin to admin page if connected
    // if (this.auth.isSignedIn()) {
    //   console.log('signed ?');
    //   this.router.navigate(['admin']);
    // }
    this.auth.listenToSignInStateChanges((user) => {
      this.auth.checkSignInState({
        whenSignedIn: (user) => {
          this.router.navigate(['admin']);
        },
        whenSignedOut: (user) => {
          this.router.navigate(['']);
        },
        // whenSignedInAndEmailNotVerified: (user) => {
        //   this.router.navigate(['emailVerification']);
        // },
        // whenSignedInAndEmailVerified: (user) => {
        //   this.router.navigate(['']);
        // },
        whenChanged: (user) => {},
      });
    });
    this.responsiveViewHeight = window.innerHeight * 0.01;
    document.documentElement.style.setProperty(
      '--responsiveViewHeight',
      `${this.responsiveViewHeight}px`
    );
    window.addEventListener('resize', () => {
      this.responsiveViewHeight = window.innerHeight * 0.01;
      document.documentElement.style.setProperty(
        '--responsiveViewHeight',
        `${this.responsiveViewHeight}px`
      );
    });
  }

  loggedIn() {
    return this.auth.isSignedIn();
  }
}
