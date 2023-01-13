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
        this.handleColumnChartsTooltip();
        this.handleColumnChartsDynamicStyle();
      }
    );
  }
  @Input() currentRoomData!: CurrentRoomData;

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

  greenTooltip: string = '';

  greenYellowTooltip: string = '';

  yellowTooltip: string = '';

  orangeTooltip: string = '';

  redTooltip: string = '';

  blackTooltip: string = '';

  whiteTooltip: string = '';

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
          this.handleColumnChartsTooltip();
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

  handleColumnChartsTooltip() {
    this.greenTooltip =
      this.itemCollection[this.currentItemIndex].green.toString();
    this.greenYellowTooltip =
      this.itemCollection[this.currentItemIndex].greenYellow.toString();
    this.yellowTooltip =
      this.itemCollection[this.currentItemIndex].yellow.toString();
    this.orangeTooltip =
      this.itemCollection[this.currentItemIndex].orange.toString();
    this.redTooltip = this.itemCollection[this.currentItemIndex].red.toString();
    this.blackTooltip =
      this.itemCollection[this.currentItemIndex].black.toString();
    this.whiteTooltip =
      this.itemCollection[this.currentItemIndex].white.toString();
  }

  handleColumnChartsDynamicStyle() {
    this.greenStyleProperty = this.greenCount;
    document.documentElement.style.setProperty(
      '--greenStyleProperty',
      `${this.greenStyleProperty}px`
    );
    this.greenYellowStyleProperty = this.greenYellowCount;
    document.documentElement.style.setProperty(
      '--greenYellowStyleProperty',
      `${this.greenYellowStyleProperty}px`
    );
    this.yellowStyleProperty = this.yellowCount;
    document.documentElement.style.setProperty(
      '--yellowStyleProperty',
      `${this.yellowStyleProperty}px`
    );
    this.orangeStyleProperty = this.orangeCount;
    document.documentElement.style.setProperty(
      '--orangeStyleProperty',
      `${this.orangeStyleProperty}px`
    );
    this.redStyleProperty = this.redCount;
    document.documentElement.style.setProperty(
      '--redStyleProperty',
      `${this.redStyleProperty}px`
    );
    this.blackStyleProperty = this.blackCount;
    document.documentElement.style.setProperty(
      '--blackStyleProperty',
      `${this.blackStyleProperty}px`
    );
    this.whiteStyleProperty = this.whiteCount;
    document.documentElement.style.setProperty(
      '--whiteStyleProperty',
      `${this.whiteStyleProperty}px`
    );
  }
}
