import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor-auth',
  templateUrl: './visitor-auth.component.html',
  styleUrls: ['./visitor-auth.component.scss'],
})
export class VisitorAuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onJoin(name: HTMLInputElement, sessionNumber: HTMLInputElement) {
    let visitorName = name.value;
    let roomNumber = sessionNumber.value;
    if (this.isNotEmpty(visitorName) && this.isNotEmpty(roomNumber)) {
    }
  }

  isNotEmpty(text: string) {
    return text !== null && text.length > 0;
  }
}
