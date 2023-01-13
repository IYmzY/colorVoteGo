import { Component, OnInit, Input } from '@angular/core';
import {
  FirebaseTSFirestore,
  OrderBy,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { CurrentRoomData } from 'src/app/pages/admin-room/admin-room.component';
import { ItemCollection } from '../room-details/room-details.component';
import { RoomServiceService } from 'src/app/services/room-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-charts',
  templateUrl: './room-charts.component.html',
  styleUrls: ['./room-charts.component.scss'],
})
export class RoomChartsComponent implements OnInit {
  constructor(private roomService: RoomServiceService) {
    this.subscription = this.roomService.ItemIndexUpdateEmitter.subscribe(
      (data) => {
        this.currentItemIndex = data;
        this.handleColumnChartsCounter();
        this.handleColumnChartsDynamicStyle();
        console.log('subscribtion : ' + this.currentItemIndex);
      }
    );
  }
  @Input() currentRoomData!: CurrentRoomData;

  // @Input() currentItemIndex: number = 0;

  currentItemIndex: number = 0;

  firestore = new FirebaseTSFirestore();

  itemCollection: ItemCollection[] = [];

  subscription: Subscription;

  greenCount: number = 0;

  greenYellowCount: number = 0;

  yellowCount: number = 0;

  orangeCount: number = 0;

  redCount: number = 0;

  blackCount: number = 0;

  whiteCount: number = 0;

  greenStyleProperty: number = 0;

  greenYellowStyleProperty: number = 0;

  yellowStyleProperty: number = 0;

  orangeStyleProperty: number = 0;

  redStyleProperty: number = 0;

  blackStyleProperty: number = 0;

  whiteStyleProperty: number = 0;

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
          this.itemCollection = [];
          result.docChanges().forEach((itemDoc) => {
            this.itemCollection.push(<ItemCollection>itemDoc.doc.data());
          });
          this.handleColumnChartsCounter();
          this.handleColumnChartsDynamicStyle();
        },
      });
    }
  }

  handleColumnChartsCounter() {
    this.greenCount = this.itemCollection[this.currentItemIndex].green.length;
    this.greenYellowCount =
      this.itemCollection[this.currentItemIndex].greenYellow.length;
    this.yellowCount = this.itemCollection[this.currentItemIndex].yellow.length;
    this.orangeCount = this.itemCollection[this.currentItemIndex].orange.length;
    this.redCount = this.itemCollection[this.currentItemIndex].red.length;
    this.blackCount = this.itemCollection[this.currentItemIndex].black.length;
    this.whiteCount = this.itemCollection[this.currentItemIndex].white.length;
  }
  handleColumnChartsDynamicStyle() {
    this.greenStyleProperty = this.greenCount * 10;
    if (
      document.documentElement.style.getPropertyValue('--greenStyleProperty')
    ) {
      document.documentElement.style.removeProperty('--greenStyleProperty');
    }
    document.documentElement.style.setProperty(
      '--greenStyleProperty',
      `${this.greenStyleProperty}px`
    );
  }
}
