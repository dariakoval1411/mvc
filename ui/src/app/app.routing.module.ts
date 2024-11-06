import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './accounting/Customers/customers.component';
import { InvoicesComponent } from './accounting/Invoices/invoices.component';
import { ChartsComponent } from './accounting/Charts/charts.component';


export const routes: Routes = [
  {
    path: '',
    data: { title: 'Customers', icon: 'people' },
    component: CustomersComponent,
  },
  {
    path: 'invoices',
    data: { title: 'Invoices', icon: 'receipt' },
    component: InvoicesComponent,
  },
  {
    path: 'charts',
    data: { title: 'Charts', icon: 'bar_chart' },
    component: ChartsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }