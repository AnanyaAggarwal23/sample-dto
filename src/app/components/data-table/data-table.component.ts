import { Component, EventEmitter, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from '../../models/card.model';
import { GetCards, DeleteCard } from '../../state/payment.actions';
import * as paymentReducer from '../../state/payment.reducer';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent {
  cards$: Observable<Card[]>;
  @Output() selectedCard = new EventEmitter<Card>();

  constructor(private store: Store<paymentReducer.State>) {
    this.store.dispatch(new GetCards.RequestAction());
    this.cards$ = this.store.pipe(select(paymentReducer.getCards));
  }

  onEdit(card: Card) {
    this.selectedCard.emit(card);
  }

  onDelete(card: Card) {
    this.store.dispatch(new DeleteCard(card.id));
  }
}
