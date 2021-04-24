import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  selectedCard: Card;

  constructor() {}

  onUpdateCard(card: Card) {
    this.selectedCard = card;
  }
}
