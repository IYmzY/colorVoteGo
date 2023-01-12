import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminRoomComponent } from './pages/admin-room/admin-room.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/dashboard/:id', component: AdminRoomComponent },
  { path: '**', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
