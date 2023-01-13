import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FirebaseTSFirestore,
  OrderBy,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { CurrentRoomData } from '../admin-room/admin-room.component';
import { ItemCollection } from 'src/app/components/room-details/room-details.component';
import { RoomServiceService } from 'src/app/services/room-service.service';

@Component({
  selector: 'app-visitor-room',
  templateUrl: './visitor-room.component.html',
  styleUrls: ['./visitor-room.component.scss'],
})
export class VisitorRoomComponent implements OnInit {
  constructor(
    // private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomServiceService
  ) {}
  firestore = new FirebaseTSFirestore();

  roomUuid!: string;

  currentitem: number = 0;

  currentItemName!: string;

  currentItemDocID!: string;

  currentRoomData!: CurrentRoomData;

  currentVisitorName!: string;

  itemCollection: ItemCollection[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((parameters) => {
      this.roomUuid = parameters.id;
    });
    this.currentVisitorName = this.roomService.currentVisitorName;
    this.listenToCurrentRoom();
    this.listenToCurrentItem();
  }
  listenToCurrentRoom() {
    this.firestore.listenToDocument({
      name: 'currentItemListenerInRoom',
      path: ['Rooms', this.roomUuid],
      onUpdate: (result) => {
        this.currentRoomData = <CurrentRoomData>result.data();
        this.currentitem = this.currentRoomData.current_item;
      },
    });
  }

  listenToCurrentItem() {
    if (this.currentRoomData) {
      this.firestore.listenToCollection({
        name: 'currentItemListener',
        path: ['Rooms', this.roomUuid, 'items'],
        where: [new OrderBy('item_order', 'asc')],
        onUpdate: (result) => {
          this.itemCollection = [];
          result.docChanges().forEach((itemDoc) => {
            this.itemCollection.push(<ItemCollection>itemDoc.doc.data());
            this.currentItemName =
              this.itemCollection[this.currentitem].item_name;
            // this.currentItemDocID = this.itemCollection[this.currentitem];
          });
        },
      });
    }
  }

  //   this.firestore.update({
  //   path: ['Rooms', this.currentRoomData.room_code],
  //   data: {
  //     current_item: this.currentItemIndex,
  //   },
  // });

  onButtonClick(color: string) {
    // this.firestore.update({
    //   path: ['Rooms', this.roomUuid, 'items'],
    //   data: {},
    // });
    switch (color) {
      case 'green':
        break;
      case 'greenYellow':
        break;
      case 'babyCount':
        break;
      default:
    }
  }
}
