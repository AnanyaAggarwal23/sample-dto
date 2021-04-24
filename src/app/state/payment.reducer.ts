import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Card } from '../models/card.model';
import {
  AddCard,
  DeleteCard,
  GetCards,
  PaymentActions,
  UpdateCard,
} from './payment.actions';

export interface PaymentState {
  cards: Card[];
}

export interface State {
  payment: PaymentState;
}

const initialState: PaymentState = {
  cards: [],
};

//Selectors
const getPaymentFeatureState = createFeatureSelector<PaymentState>('payment');

//Selector rtuening card list
export const getCards = createSelector(
  getPaymentFeatureState,
  (state) => state.cards
);

export function reducer(
  state = initialState,
  action: PaymentActions
): PaymentState {
  switch (action.type) {
    case AddCard.SuccessAction.type:
      return {
        ...state,
        cards: [...state!.cards, action.card],
      };

    case GetCards.SuccessAction.type:
      return {
        ...state,
        cards: action.cards,
      };
    case UpdateCard.type:
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card!.id === action.card!.id) {
            return action.card;
          }
          return card;
        }),
      };

    case DeleteCard.type:
      return {
        ...state,
        cards: state.cards.filter((c: Card) => c.id !== action.id),
      };

    default:
      return state;
  }
}
