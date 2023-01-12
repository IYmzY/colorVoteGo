import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.scss'],
})
export class AdminRoomComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  auth = new FirebaseTSAuth();

  firestore = new FirebaseTSFirestore();

  roomUuid!: string;

  roomData: RoomData;

  ngOnInit(): void {
    this.listenToCurrentRoom();
    this.route.params.subscribe((parameters) => {
      this.roomUuid = parameters.id;
    });
    console.log(this.roomUuid);
  }

  async onLogoutClick() {
    if (this.auth.isSignedIn()) {
      await this.auth.signOut();
      this.router.navigate(['']);
    }
  }
  onBackTo() {
    this.router.navigate(['admin']);
  }

  listenToCurrentRoom() {
    this.firestore.listenToDocument({
      name: 'currentRoomListener',
      path: ['Rooms', this.roomUuid],
      onUpdate: (result) => {
        this.roomData = <RoomData>result.data();
        //a console log 'result" etc
        // this.allLikes = this.allLikesPostCount.likesCount;
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
}
