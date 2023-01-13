import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss'],
})
export class AuthenticatorComponent implements OnInit {
  state = AuthComponentState.LOGIN;

  firebasetsAuth: FirebaseTSAuth;

  constructor(private router: Router) {
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {}

  onLogingIn(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement) {
    let email = loginEmail.value;
    let password = loginPassword.value;
    if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebasetsAuth.signInWith({
        email: email,
        password: password,
        onComplete: (uc) => {
          console.log('Connecté');
          this.router.navigate(['admin']);
        },
        onFail: (err) => {
          alert(err);
        },
      });
    }
  }

  onResetPassword(resetEmail: HTMLInputElement) {
    let email = resetEmail.value;
    if (this.isNotEmpty(email)) {
      this.firebasetsAuth.sendPasswordResetEmail({
        email: email,
        onComplete: (err) => {
          alert(
            `Les instructions de réinitialisation de votre mot de passe sont envoyées sur votre adresse email: ${email}`
          );
        },
      });
    }
  }

  isNotEmpty(text: string) {
    return text !== null && text.length > 0;
  }
  isSame(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }

  onForgotPasswordClick() {
    this.state = AuthComponentState.FORGOT_PASSWORD;
  }

  onLoginClick() {
    this.state = AuthComponentState.LOGIN;
  }

  isInLogin() {
    return this.state == AuthComponentState.LOGIN;
  }

  isInForgotPassword() {
    return this.state == AuthComponentState.FORGOT_PASSWORD;
  }

  getHeaderText() {
    switch (this.state) {
      case AuthComponentState.LOGIN:
        return 'Connexion avec votre identifiant administrateur';
      case AuthComponentState.FORGOT_PASSWORD:
        return 'Mot de passe oublié';
    }
  }
}

export enum AuthComponentState {
  LOGIN,
  FORGOT_PASSWORD,
}
