import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../types';

const mockOrders = [{
  orderStatus: 'In progress',
},{
  orderStatus: 'In progress',
},{
  orderStatus: 'New',
},{
  orderStatus: 'New',
},{
  orderStatus: 'New',
},{
  orderStatus: 'Finished',
},{
  orderStatus: 'In progress',
},{
  orderStatus: 'Finished',
},{
  orderStatus: 'In progress',
},{
  orderStatus: 'In progress',
}]

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  constructor() {
  }

  getPage(page: number): Observable<Order[]> {
    const pageOrders = mockOrders.map((order, i) => {
      return {
        ...order,
        id: ((page - 1) * 10) + i + 1,
      };
    })
    return of(pageOrders);
  }
}
