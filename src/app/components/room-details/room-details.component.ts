import { Component, OnInit, Input } from '@angular/core';
import {
  FirebaseTSFirestore,
  Limit,
  OrderBy,
  Where,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { CurrentRoomData } from 'src/app/pages/admin-room/admin-room.component';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit {
  constructor() {}
  @Input() currentRoomData!: CurrentRoomData;

  firestore = new FirebaseTSFirestore();

  itemCollection: ItemCollection[] = [];

  currentItem: any;

  currentItemIndex: number = 0;

  isLastItem: boolean = false;

  itemNames!: string;

  ngOnInit(): void {
    this.getItemsOfCurrentRoom();
  }

  getItemsOfCurrentRoom() {
    if (this.currentRoomData) {
      this.firestore.listenToCollection({
        name: 'ItemsListener',
        path: ['Rooms', this.currentRoomData.room_code, 'items'],
        where: [new Limit(10)],
        onUpdate: (result) => {
          if (result) {
            console.log('result exist : ' + JSON.stringify(result));
          }
          result.docChanges().forEach((itemDoc) => {
            if (itemDoc.type === 'added' || itemDoc.type === 'modified') {
              this.itemCollection.push(<ItemCollection>itemDoc.doc.data());
              this.itemNames =
                this.itemCollection[this.currentItemIndex].item_name;
            }
          });
        },
      });
    }
  }

  onNext() {
    if (this.currentItemIndex + 2 < this.itemCollection.length) {
      this.currentItemIndex++;
      this.itemNames = this.itemCollection[this.currentItemIndex].item_name;
    } else {
      this.isLastItem = true;
    }
  }
}
export interface ItemCollection {
  green: [];
  greenYellow: [];
  yellow: [];
  orange: [];
  red: [];
  black: [];
  white: [];
  item_name: string;
  timestamp: firebase.default.firestore.Timestamp;
}
