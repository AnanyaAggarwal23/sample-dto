import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PaymentService } from './payment.service';
import { AddCard, GetCards } from './payment.actions';

@Injectable()
export class PaymentEffects {
  constructor(
    private paymentService: PaymentService,
    private actions$: Actions
  ) {}

  @Effect()
  GetCards = this.actions$.pipe(
    ofType(GetCards.RequestAction.type),
    switchMap(() =>
      this.paymentService.getCards().pipe(
        map(
          (cards) => new GetCards.SuccessAction(cards),
          catchError((error) => [new GetCards.FailureAction(error)])
        )
      )
    )
  );

  @Effect()
  AddCard = this.actions$.pipe(
    ofType(AddCard.RequestAction.type),
    map((action: AddCard.RequestAction) => action.card),
    switchMap((card) =>
      this.paymentService.addCard(card).pipe(
        switchMap((card) => [new AddCard.SuccessAction(card)]),
        catchError((error) => [new AddCard.FailureAction(error)])
      )
    )
  );
}
