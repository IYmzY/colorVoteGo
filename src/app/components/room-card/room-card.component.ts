import { Component, Input, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { RoomData } from 'src/app/pages/admin/admin.component';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  firestore = new FirebaseTSFirestore();

  liveStatus: string = 'offline';

  // date;

  @Input() roomData!: RoomData;

  constructor() {}

  ngOnInit(): void {
    // this.date = this.roomData.timestamp.toDate();
  }
}
