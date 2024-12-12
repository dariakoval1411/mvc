import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routing.module';
import {  HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MenuSideComponent } from './menu/menu-side/menu-side.component';
import { MenuBreadcrumbComponent } from './menu/menu-breadcrumb/menu-breadcrumb.component';
import { CustomersComponent } from './accounting/Customers/customers.component';
import { ChartsComponent } from './accounting/Charts/charts.component';
import { InvoicesComponent } from './accounting/Invoices/invoices.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PaymentsComponent } from './payments/payments.component';


@NgModule({
    declarations: [
      AppComponent,
      MenuSideComponent, 
      MenuBreadcrumbComponent,
      CustomersComponent,
      ChartsComponent,
      InvoicesComponent,
      PaymentsComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule,
      MatButtonModule,
      BrowserAnimationsModule,
      MatListModule,
      MatTableModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatSortModule,
      MatDialogModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes)
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [],
    bootstrap: [AppComponent]
  })

export class AppModule { }