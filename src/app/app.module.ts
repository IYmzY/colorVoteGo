import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from 'src/environments/environment';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';
import { VisitorAuthComponent } from './components/visitor-auth/visitor-auth.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { AdminRoomComponent } from './pages/admin-room/admin-room.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { RoomChartsComponent } from './components/room-charts/room-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AuthenticatorComponent,
    VisitorAuthComponent,
    AdminComponent,
    CreateRoomComponent,
    RoomCardComponent,
    AdminRoomComponent,
    RoomDetailsComponent,
    RoomChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
