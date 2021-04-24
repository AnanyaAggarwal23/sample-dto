import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card.model';

@Injectable()
export class PaymentService {
  baseUrl: string =
    'https://my-json-server.typicode.com/AnanyaAggarwal23/server/cards';

  constructor(private readonly http: HttpClient) {}

  //To get card list
  getCards() {
    return this.http.get<Card[]>(this.baseUrl);
  }

  //To add a card to the list
  addCard(card: Card) {
    return this.http.post<Card>(this.baseUrl, card);
  }

  getData() {
    return this.http.get<any>('https://randomuser.me/api');
  }
}
