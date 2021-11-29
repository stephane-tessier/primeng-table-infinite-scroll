import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  lastEvent: LazyLoadEvent = {};
  currentPage = 0;

  constructor(
    private ordersService: OrdersService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
  }

  loadOrders(event: LazyLoadEvent) {
    console.log('loadOrders: ', { ...event });
    this.lastEvent = event;
    this.currentPage++;
    if (this.currentPage === 1) {
      this.orders = Array.from({length: 90});
    }

    this.loading = true;
    this.ordersService.getPage(this.currentPage).subscribe((data) => {
      console.log('page', this.currentPage);
      console.log('data: ', data);
      this.loading = false;
      // Array.prototype.splice.apply(this.orders, [event.first ?? 0, event.rows ?? 10, ...data]);
      Array.prototype.splice.apply(this.orders, [(this.currentPage - 1) * 10, 10, ...data]);
      console.log('this.orders: ', this.orders);
      this.orders = [...this.orders]; // detect changes
      this.cd.detectChanges();
    });
  }
}
