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

  currentItemDocument!: ItemCollection;

  ngOnInit(): void {
    this.route.params.subscribe((parameters) => {
      this.roomUuid = parameters.id;
    });
    // this.roomUuid = 'KC23iJNbJhwkSzS2Kk6u';
    this.currentVisitorName = this.roomService.currentVisitorName;
    this.listenToCurrentRoom();
    this.listenToCurrentItem();
    // this.listenToCurrentItemDocument();
  }

  listenToCurrentRoom() {
    this.firestore.getDocument({
      path: ['Rooms', this.roomUuid],
      onComplete: (result) => {
        if (result.exists) {
          this.currentRoomData = <CurrentRoomData>result.data();
          this.currentitem = this.currentRoomData.current_item;
          // this.currentItemDocID =
          //   this.currentRoomData.itemUuid[this.currentitem];
          if (this.currentRoomData.itemUuid[this.currentitem]) {
            console.log('je listen');
            this.firestore.listenToDocument({
              name: 'listenerCurrentitemDocument',
              path: [
                'Rooms',
                this.roomUuid,
                'items',
                this.currentRoomData.itemUuid[this.currentitem],
              ],
              onUpdate: (result) => {
                console.log('result : ' + result);
                this.currentItemDocument = <ItemCollection>result.data();
                console.log('currentItemDocument' + this.currentItemDocument);
              },
            });
          } else {
            console.log('no current document ID');
          }
        } else {
          window.alert("this sessionNumber doesn't exist");
        }
      },
      onFail(err) {
        window.alert(err);
      },
    });
  }

  // async listenToCurrentRoom() {
  //   await this.firestore.listenToDocument({
  //     name: 'currentItemListenerInRoom',
  //     path: ['Rooms', this.roomUuid],
  //     onUpdate: (result) => {
  //       this.currentRoomData = <CurrentRoomData>result.data();
  //       this.currentitem = this.currentRoomData.current_item;
  //       this.currentItemDocID = this.currentRoomData.itemUuid[this.currentitem];
  //     },
  //   });
  //   console.log(this.currentItemDocID + ' current item doc id');
  // }

  async listenToCurrentItem() {
    if (this.currentRoomData) {
      await this.firestore.listenToCollection({
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

  // async listenToCurrentItemDocument() {
  //   if (this.currentRoomData.itemUuid[this.currentitem]) {
  //     console.log('je listen');
  //     await this.firestore.listenToDocument({
  //       name: 'listenerCurrentitemDocument',
  //       path: ['Rooms', this.roomUuid, 'items', this.currentItemDocID],
  //       onUpdate: (result) => {
  //         console.log('result : ' + result);
  //         this.currentItemDocument = <ItemCollection>result.data();
  //       },
  //     });
  //   } else {
  //     console.log('no current document ID');
  //   }
  // }

  onButtonClick(color: string) {
    if (this.currentItemDocument) {
      if (
        this.currentItemDocument.green.length > 0 &&
        this.currentItemDocument.green
      ) {
        for (const element of this.currentItemDocument.green) {
          if (element === this.roomService.currentVisitorName) {
            window.alert(
              'you have already voted, you can only vote once per item'
            );
            return;
          }
        }
      } else {
        console.log('ça passe on avance');
      }

      if (
        this.currentItemDocument.greenYellow.length > 0 &&
        this.currentItemDocument.greenYellow
      ) {
        for (const element of this.currentItemDocument.greenYellow) {
          if (element === this.roomService.currentVisitorName) {
            window.alert(
              'you have already voted, you can only vote once per item'
            );
            return;
          }
        }
      }
      if (
        this.currentItemDocument.yellow.length > 0 &&
        this.currentItemDocument.yellow
      ) {
        for (const element of this.currentItemDocument.yellow) {
          if (element === this.roomService.currentVisitorName) {
            window.alert(
              'you have already voted, you can only vote once per item'
            );
            return;
          }
        }
      }
      if (
        this.currentItemDocument.orange.length > 0 &&
        this.currentItemDocument.orange
      ) {
        for (const element of this.currentItemDocument.orange) {
          if (element === this.roomService.currentVisitorName) {
            window.alert(
              'you have already voted, you can only vote once per item'
            );
            return;
          }
        }
      }
      if (
        this.currentItemDocument.red.length > 0 &&
        this.currentItemDocument.red
      ) {
        for (const element of this.currentItemDocument.red) {
          if (element === this.roomService.currentVisitorName) {
            window.alert(
              'you have already voted, you can only vote once per item'
            );
            return;
          }
        }
      }
      if (
        this.currentItemDocument.black.length > 0 &&
        this.currentItemDocument.black
      ) {
        for (const element of this.currentItemDocument.black) {
          if (element === this.roomService.currentVisitorName) {
            window.alert(
              'you have already voted, you can only vote once per item'
            );
            return;
          }
        }
      }
      if (
        this.currentItemDocument.white.length > 0 &&
        this.currentItemDocument.white
      ) {
        for (const element of this.currentItemDocument.white) {
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
            path: [
              'Rooms',
              this.roomUuid,
              'items',
              this.currentRoomData.itemUuid[this.currentitem],
            ],
            data: {
              green: this.firestore.appendArray(
                this.roomService.currentVisitorName
              ),
            },
          });
          break;
        case 'greenYellow':
          this.firestore.update({
            path: [
              'Rooms',
              this.roomUuid,
              'items',
              this.currentRoomData.itemUuid[this.currentitem],
            ],
            data: {
              greenYellow: this.firestore.appendArray(
                this.roomService.currentVisitorName
              ),
            },
          });
          break;
        case 'yellow':
          this.firestore.update({
            path: [
              'Rooms',
              this.roomUuid,
              'items',
              this.currentRoomData.itemUuid[this.currentitem],
            ],
            data: {
              yellow: this.firestore.appendArray(
                this.roomService.currentVisitorName
              ),
            },
          });
          break;
        case 'orange':
          this.firestore.update({
            path: [
              'Rooms',
              this.roomUuid,
              'items',
              this.currentRoomData.itemUuid[this.currentitem],
            ],
            data: {
              orange: this.firestore.appendArray(
                this.roomService.currentVisitorName
              ),
            },
          });
          break;
        case 'red':
          this.firestore.update({
            path: [
              'Rooms',
              this.roomUuid,
              'items',
              this.currentRoomData.itemUuid[this.currentitem],
            ],
            data: {
              red: this.firestore.appendArray(
                this.roomService.currentVisitorName
              ),
            },
          });
          break;
        case 'black':
          this.firestore.update({
            path: [
              'Rooms',
              this.roomUuid,
              'items',
              this.currentRoomData.itemUuid[this.currentitem],
            ],
            data: {
              black: this.firestore.appendArray(
                this.roomService.currentVisitorName
              ),
            },
          });
          break;
        case 'white':
          this.firestore.update({
            path: [
              'Rooms',
              this.roomUuid,
              'items',
              this.currentRoomData.itemUuid[this.currentitem],
            ],
            data: {
              white: this.firestore.appendArray(
                this.roomService.currentVisitorName
              ),
            },
          });
          break;
        default:
      }
    } else {
      console.log('no current document button');
    }
  }
}
