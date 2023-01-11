import { Component, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {
  constructor() {}
  itemCount: number = 2;

  itemCountCollection = ['item', 'item'];

  firestore = new FirebaseTSFirestore();

  auth = new FirebaseTSAuth();

  ngOnInit(): void {}

  onAddClick() {
    this.itemCount += 1;
    this.itemCountCollection.push('item');
    // this.bkService.currentNbAdults = this.adultCount;
  }

  onMinusClick() {
    if (this.itemCount > 0) {
      this.itemCount -= 1;
      this.itemCountCollection.shift();
      // this.bkService.currentNbInfants = this.babyCount;
    }
  }
  onCreateClick() {}
}
