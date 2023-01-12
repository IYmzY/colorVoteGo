import { Component, OnInit, Input } from '@angular/core';
import {
  FirebaseTSFirestore,
  OrderBy,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { CurrentRoomData } from 'src/app/pages/admin-room/admin-room.component';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit {
  firestore = new FirebaseTSFirestore();

  itemCollection: ItemCollection[] = [];

  currentItem: any;

  currentItemIndex: number = 0;

  isLastItem: boolean = false;

  @Input() currentRoomData!: CurrentRoomData;
  constructor() {}

  ngOnInit(): void {
    this.getItemsOfCurrentRoom();
    this.currentItem = <ItemCollection>this.itemCollection[0];
  }

  async getItemsOfCurrentRoom() {
    console.log(this.currentRoomData);
    if (this.currentRoomData) {
      await this.firestore.listenToCollection({
        name: 'ItemsListener',
        path: ['Rooms', this.currentRoomData.room_code, 'items'],
        where: [new OrderBy('timestamp', 'asc')],
        onUpdate: (result) => {
          result.docChanges().forEach((itemDoc) => {
            if (itemDoc.type === 'added') {
              let item = <ItemCollection>itemDoc.doc.data();
              this.itemCollection.unshift(item);
            }
          });
        },
      });
      console.log(this.currentItem);
      console.log(this.currentRoomData);
      console.log('itemCollection ' + this.itemCollection);
      console.log(this.currentRoomData.room_code);
    } else {
      console.log("current room data don't exist");
    }
  }
  onNext() {
    if (this.currentItemIndex < this.itemCollection.length) {
      this.currentItemIndex++;
    } else {
      this.isLastItem = true;
    }
  }
}
export interface ItemCollection {
  green: [string];
  greenYellow: [string];
  yellow: [string];
  orange: [string];
  red: [string];
  black: [string];
  white: [string];
  item_name: string;
}
