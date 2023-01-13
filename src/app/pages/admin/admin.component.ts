import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import {
  FirebaseTSFirestore,
  OrderBy,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoomComponent } from 'src/app/components/create-room/create-room.component';
import { RoomServiceService } from 'src/app/services/room-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  auth = new FirebaseTSAuth();

  firestore = new FirebaseTSFirestore();

  subscription: Subscription;

  rooms: RoomData[] = [];
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private roomService: RoomServiceService
  ) {
    this.subscription = this.roomService.getRoomsUpdate().subscribe(() => {
      this.getRooms();
    });
  }

  ngOnInit(): void {
    if (!this.auth.isSignedIn()) {
      this.router.navigate(['']);
    }
    this.getRooms();
  }

  async onLogoutClick() {
    if (this.auth.isSignedIn()) {
      await this.auth.signOut();
      this.router.navigate(['']);
    }
  }

  onRoomCreate() {
    this.dialog.open(CreateRoomComponent);
  }

  getRooms() {
    this.firestore.listenToCollection({
      name: 'RoomsListener',
      path: ['Rooms'],
      where: [new OrderBy('timestamp', 'asc')],
      onUpdate: (result) => {
        result.docChanges().forEach((roomDoc) => {
          if (roomDoc.type === 'added') {
            let room = <RoomData>roomDoc.doc.data();
            room.room_code = roomDoc.doc.id;
            this.rooms.unshift(room);
          }
        });
      },
    });
  }
}
export interface RoomData {
  room_code: string;
  room_name: string;
  timestamp: firebase.default.firestore.Timestamp;
  total_items: number;
  total_participant: number;
  live_status: boolean;
  current_item: number;
}
