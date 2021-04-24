import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddCard, UpdateCard } from '../../state/payment.actions';
import * as paymentReducer from '../../state/payment.reducer';
import * as moment from 'moment';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent {
  readonly paymentForm: FormGroup;
  showDateError: boolean = false;
  currentDate = moment(new Date()).format('YYYY-MM-DD');

  @Input()
  set selectedCard(card: Card) {
    this._selectedCard = card;
    if (card) {
      this.paymentForm
        .get('nameControl')
        .setValue(this._selectedCard.cardHolderName);
      this.paymentForm.get('numControl').setValue(this._selectedCard.cardNo);
      this.paymentForm
        .get('expDateControl')
        .setValue(this._selectedCard.cardExpDate);
      this.paymentForm
        .get('secCodeControl')
        .setValue(this._selectedCard.cardSecCode);
      this.paymentForm
        .get('amntControl')
        .setValue(this._selectedCard.cardAmount);
    }
  }
  get selectedCard() {
    return this._selectedCard;
  }
  _selectedCard: Card;

  readonly controls = {
    nameControl: new FormControl('', Validators.required),
    numControl: new FormControl('', Validators.required),
    expDateControl: new FormControl('', Validators.required),
    secCodeControl: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(3),
    ]),
    amntControl: new FormControl(0, [Validators.required, Validators.min(0)]),
  };

  constructor(private store: Store<paymentReducer.State>) {
    this.paymentForm = new FormGroup(this.controls);

    this.controls.expDateControl.valueChanges.subscribe((date) => {
      if (date < this.currentDate) {
        this.showDateError = true;
      } else {
        this.showDateError = false;
      }
    });
  }

  onSubmit() {
    this.store.dispatch(
      new AddCard.RequestAction({
        cardHolderName: this.controls.nameControl.value,
        cardNo: this.controls.numControl.value,
        cardExpDate: this.controls.expDateControl.value,
        cardSecCode: this.controls.secCodeControl.value,
        cardAmount: this.controls.amntControl.value,
      })
    );
    this.paymentForm.reset();
  }

  onUpdate() {
    this.store.dispatch(
      new UpdateCard({
        id: this.selectedCard.id,
        cardHolderName: this.controls.nameControl.value,
        cardNo: this.controls.numControl.value,
        cardExpDate: this.controls.expDateControl.value,
        cardSecCode: this.controls.secCodeControl.value,
        cardAmount: this.controls.amntControl.value,
      })
    );
    this.paymentForm.reset();
    this.selectedCard = null;
  }
}
