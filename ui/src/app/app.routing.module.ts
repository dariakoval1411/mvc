import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './accounting/Customers/customers.component';
import { InvoicesComponent } from './accounting/Invoices/invoices.component';
import { ChartsComponent } from './accounting/Charts/charts.component';
import { PaymentsComponent } from './payments/payments.component';



export const routes: Routes = [
  {
    path: '',
    data: { title: 'Customers', icon: 'people' },
    component: CustomersComponent,
  },
  {
    path: 'charts',
    data: { title: 'Charts', icon: 'bar_chart' },
    component: ChartsComponent,
  },
  {
    path: 'invoices',
    data: { title: 'Invoices', icon: 'invoice' },
    component: InvoicesComponent,
  },
  {
  path: 'payments',
  data: { title: 'Payments', icon: 'payments' },
  component: PaymentsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }