import { Component, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Router } from '@angular/router';
import { RoomServiceService } from 'src/app/services/room-service.service';

@Component({
  selector: 'app-visitor-auth',
  templateUrl: './visitor-auth.component.html',
  styleUrls: ['./visitor-auth.component.scss'],
})
export class VisitorAuthComponent implements OnInit {
  constructor(
    private router: Router,
    private roomService: RoomServiceService
  ) {}

  firestore = new FirebaseTSFirestore();

  ngOnInit(): void {}

  onJoin(name: HTMLInputElement, sessionNumber: HTMLInputElement) {
    let visitorName = name.value;
    let roomNumber = sessionNumber.value;
    if (this.isNotEmpty(visitorName) && this.isNotEmpty(roomNumber)) {
      if (visitorName.length <= 25) {
        this.firestore.getDocument({
          path: ['Rooms', roomNumber],
          onComplete: (result) => {
            if (result.exists) {
              this.roomService.currentVisitorName.next(visitorName);
              this.router.navigate([`room/${roomNumber}`]);
            } else {
              window.alert("this sessionNumber doesn't exist");
            }
          },
          onFail(err) {
            window.alert(err);
          },
        });
      }
    } else {
      window.alert('verify that all fields are correctly filled');
    }
  }

  // getUserProfile() {
  //   this.firestore.getDocument({
  //     path: ['UsersProfile', this.auth.getAuth().currentUser?.uid!],
  //     onComplete: (result) => {
  //       if (result.exists && result.data()?.publicName.length > 0) {
  //         this.username = result.data()?.publicName;
  //       }
  //       if (result.exists && result.data()?.imageProfile) {
  //         this.currentImageProfileUrl = result.data()?.imageProfile;
  //       }
  //     },
  //   });
  // }

  isNotEmpty(text: string) {
    return text !== null && text.length > 0;
  }
}
