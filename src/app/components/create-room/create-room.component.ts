import { Component, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';
import { RoomServiceService } from 'src/app/services/room-service.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {
  constructor(
    private dialog: MatDialogRef<CreateRoomComponent>,
    private roomService: RoomServiceService
  ) {}
  itemCount: number = 2;

  itemCountCollection = ['item', 'item'];

  firestore = new FirebaseTSFirestore();

  auth = new FirebaseTSAuth();

  ngOnInit(): void {}

  onAddClick() {
    this.itemCount += 1;
    this.itemCountCollection.push('item');
  }

  onMinusClick() {
    if (this.itemCount > 1) {
      this.itemCount -= 1;
      this.itemCountCollection.shift();
    }
  }
  onCreateClick(roomName: HTMLTextAreaElement) {
    let name = roomName.value;
    let roomID = this.firestore.genDocId();

    if (
      name.length <= 30 &&
      name.length > 0 &&
      this.verifyAllInputAreFilledCorrectly()
    ) {
      this.firestore.create({
        path: ['Rooms', roomID],
        data: {
          room_code: roomID,
          room_name: name,
          total_items: this.itemCount,
          timestamp: FirebaseTSApp.getFirestoreTimestamp(),
          total_participant: 0,
        },
        onComplete: (docId) => {
          const itemsCollection =
            document.querySelectorAll<HTMLTextAreaElement>('.item-label-name');
          itemsCollection.forEach((item) => {
            let itemID = this.firestore.genDocId();
            this.firestore.create({
              path: ['Rooms', roomID, 'items', itemID],
              data: {
                item_name: item.value,
                red: [],
                orange: [],
                yellow: [],
                greenYellow: [],
                green: [],
              },
              onComplete: (docId) => {
                this.roomService.sendRoomsUpdate(true);
                this.dialog.close();
              },
              onFail(err) {
                console.log(err);
              },
            });
          });
        },
      });
    } else {
      window.alert('verify that all fields are correctly filled');
    }
  }

  verifyAllInputAreFilledCorrectly() {
    let isCorrect: boolean = true;
    const itemsCollection =
      document.querySelectorAll<HTMLTextAreaElement>('.item-label-name');
    itemsCollection.forEach((item) => {
      if (item.value.length === 0 || item.value.length > 150) {
        isCorrect = false;
      } else {
        isCorrect = true;
      }
    });
    return isCorrect;
  }
}
