import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }

  @Output() selectedFeatureEvent = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
