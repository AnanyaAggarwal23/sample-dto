import { Action } from '@ngrx/store';
import { Card } from '../models/card.model';

export type PaymentActions =
  | AddCard.SubAction
  | GetCards.SubAction
  | UpdateCard
  | DeleteCard;

//Action for adding Card
export namespace AddCard {
  export type SubAction = RequestAction | SuccessAction | FailureAction;

  export class RequestAction implements Action {
    static readonly type = '[Dashboard] Add Card Request';
    readonly type = RequestAction.type;

    constructor(public card: Card) {}
  }

  export class SuccessAction implements Action {
    static readonly type = '[Dashboard] Add Card Success';
    readonly type = SuccessAction.type;
    constructor(public card: Card) {}
  }

  export class FailureAction implements Action {
    static readonly type = '[Dashboard] Add Card Failure';
    readonly type = FailureAction.type;

    constructor(readonly error: Error) {}
  }
}

//Action for getting Card list
export namespace GetCards {
  export type SubAction = RequestAction | SuccessAction | FailureAction;

  export class RequestAction implements Action {
    static readonly type = '[Dashboard] Get Cards Request';
    readonly type = RequestAction.type;

    constructor() {}
  }

  export class SuccessAction implements Action {
    static readonly type = '[Dashboard] Get Cards Success';
    readonly type = SuccessAction.type;

    constructor(public cards: Card[]) {}
  }

  export class FailureAction implements Action {
    static readonly type = '[Dashboard] Get Cards Failure';
    readonly type = FailureAction.type;

    constructor(readonly error: Error) {}
  }
}

export class UpdateCard implements Action {
  static readonly type = '[Dashboard] Update Card';

  readonly type = UpdateCard.type;

  constructor(readonly card: Card) {}
}

export class DeleteCard implements Action {
  static readonly type = '[Dashboard] Delete Card';

  readonly type = DeleteCard.type;

  constructor(readonly id: number) {}
}
