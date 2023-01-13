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
        this.currentItemDocID = this.currentRoomData.itemUuid[this.currentitem];
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
          });
        },
      });
    }
  }

  onButtonClick(color: string) {
    if (
      this.itemCollection[this.currentitem].green.length > 0 &&
      this.itemCollection[this.currentitem].green
    ) {
      for (const element of this.itemCollection[this.currentitem].green) {
        if (element === this.roomService.currentVisitorName) {
          window.alert(
            'you have already voted, you can only vote once per item'
          );
          return;
        }
      }
    }

    if (
      this.itemCollection[this.currentitem].greenYellow.length > 0 &&
      this.itemCollection[this.currentitem].greenYellow
    ) {
      for (const element of this.itemCollection[this.currentitem].greenYellow) {
        if (element === this.roomService.currentVisitorName) {
          window.alert(
            'you have already voted, you can only vote once per item'
          );
          return;
        }
      }
    }
    if (
      this.itemCollection[this.currentitem].yellow.length > 0 &&
      this.itemCollection[this.currentitem].yellow
    ) {
      for (const element of this.itemCollection[this.currentitem].yellow) {
        if (element === this.roomService.currentVisitorName) {
          window.alert(
            'you have already voted, you can only vote once per item'
          );
          return;
        }
      }
    }
    if (
      this.itemCollection[this.currentitem].orange.length > 0 &&
      this.itemCollection[this.currentitem].orange
    ) {
      for (const element of this.itemCollection[this.currentitem].orange) {
        if (element === this.roomService.currentVisitorName) {
          window.alert(
            'you have already voted, you can only vote once per item'
          );
          return;
        }
      }
    }
    if (
      this.itemCollection[this.currentitem].red.length > 0 &&
      this.itemCollection[this.currentitem].red
    ) {
      for (const element of this.itemCollection[this.currentitem].red) {
        if (element === this.roomService.currentVisitorName) {
          window.alert(
            'you have already voted, you can only vote once per item'
          );
          return;
        }
      }
    }
    if (
      this.itemCollection[this.currentitem].black.length > 0 &&
      this.itemCollection[this.currentitem].black
    ) {
      for (const element of this.itemCollection[this.currentitem].black) {
        if (element === this.roomService.currentVisitorName) {
          window.alert(
            'you have already voted, you can only vote once per item'
          );
          return;
        }
      }
    }
    if (
      this.itemCollection[this.currentitem].white.length > 0 &&
      this.itemCollection[this.currentitem].white
    ) {
      for (const element of this.itemCollection[this.currentitem].white) {
        if (element === this.roomService.currentVisitorName) {
          window.alert(
            'you have already voted, you can only vote once per item'
          );
          return;
        }
      }
    }

    switch (color) {
      case 'green':
        this.firestore.update({
          path: ['Rooms', this.roomUuid, 'items', this.currentItemDocID],
          data: {
            green: this.firestore.appendArray(
              this.roomService.currentVisitorName
            ),
          },
        });
        break;
      case 'greenYellow':
        this.firestore.update({
          path: ['Rooms', this.roomUuid, 'items', this.currentItemDocID],
          data: {
            greenYellow: this.firestore.appendArray(
              this.roomService.currentVisitorName
            ),
          },
        });
        break;
      case 'yellow':
        this.firestore.update({
          path: ['Rooms', this.roomUuid, 'items', this.currentItemDocID],
          data: {
            yellow: this.firestore.appendArray(
              this.roomService.currentVisitorName
            ),
          },
        });
        break;
      case 'orange':
        this.firestore.update({
          path: ['Rooms', this.roomUuid, 'items', this.currentItemDocID],
          data: {
            orange: this.firestore.appendArray(
              this.roomService.currentVisitorName
            ),
          },
        });
        break;
      case 'red':
        this.firestore.update({
          path: ['Rooms', this.roomUuid, 'items', this.currentItemDocID],
          data: {
            red: this.firestore.appendArray(
              this.roomService.currentVisitorName
            ),
          },
        });
        break;
      case 'black':
        this.firestore.update({
          path: ['Rooms', this.roomUuid, 'items', this.currentItemDocID],
          data: {
            black: this.firestore.appendArray(
              this.roomService.currentVisitorName
            ),
          },
        });
        break;
      case 'white':
        this.firestore.update({
          path: ['Rooms', this.roomUuid, 'items', this.currentItemDocID],
          data: {
            white: this.firestore.appendArray(
              this.roomService.currentVisitorName
            ),
          },
        });
        break;
      default:
    }
  }
}
