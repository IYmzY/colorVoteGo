import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomServiceService {
  isRoomsUpdated: Subject<boolean> = new Subject<boolean>();

  ItemIndexUpdateEmitter = new Subject<number>();

  currentVisitorName: string = 'user';
  constructor() {}

  sendRoomsUpdate(isUpdated: boolean) {
    this.isRoomsUpdated.next(isUpdated);
  }

  getRoomsUpdate(): Observable<boolean> {
    return this.isRoomsUpdated.asObservable();
  }
}
