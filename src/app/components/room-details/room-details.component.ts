import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FirebaseTSFirestore,
  OrderBy,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { CurrentRoomData } from 'src/app/pages/admin-room/admin-room.component';
import { RoomServiceService } from 'src/app/services/room-service.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit {
  constructor(private roomService: RoomServiceService) {}
  @Input() currentRoomData!: CurrentRoomData;

  // @Output() currentItemIndexEmitter: EventEmitter<number> = new EventEmitter();

  firestore = new FirebaseTSFirestore();

  itemCollection: ItemCollection[] = [];

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
        where: [new OrderBy('item_order', 'asc')],
        onUpdate: (result) => {
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
    if (this.currentItemIndex + 1 < this.itemCollection.length) {
      this.currentItemIndex++;
      this.roomService.ItemIndexUpdateEmitter.next(this.currentItemIndex);
      // this.currentItemIndexEmitter.emit(this.currentItemIndex);
      this.itemNames = this.itemCollection[this.currentItemIndex].item_name;
      if (this.currentItemIndex + 1 === this.itemCollection.length) {
        this.isLastItem = true;
      }
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
  item_order: number;
}
