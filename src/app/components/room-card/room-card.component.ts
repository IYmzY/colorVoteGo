import { Component, Input, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { RoomData } from 'src/app/pages/admin/admin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  firestore = new FirebaseTSFirestore();

  liveStatus: string = 'offline';

  @Input() roomData!: RoomData;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRoomCardClick() {
    this.router.navigate([`admin/dashboard/${this.roomData.room_code}`]);
  }
}
