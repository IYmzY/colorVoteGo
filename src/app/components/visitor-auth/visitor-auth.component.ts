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
              this.roomService.currentVisitorName = visitorName;
              this.firestore.update({
                path: ['Rooms', roomNumber],
                data: { total_participant: this.firestore.increment(1) },
              });
              this.router.navigate([`room/${roomNumber}`]);
            } else {
              window.alert("Cet identifiant de session n'existe pas");
            }
          },
          onFail(err) {
            window.alert(err);
          },
        });
      }
    } else {
      window.alert('Verifiez que tous les champs soient correctement remplis');
    }
  }

  isNotEmpty(text: string) {
    return text !== null && text.length > 0;
  }
}
