import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CalculateComponent } from './common/calculate/calculate.component';
import { ToDoListComponent } from './common/to-do-list/to-do-list.component';
import { routes } from './app.routes';
import {  HttpClientModule } from '@angular/common/http';
import { QuotesComponent } from './common/quotes/quotes.component';

@NgModule({
    declarations: [
      AppComponent,
      CalculateComponent,
      ToDoListComponent,
      QuotesComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
  })

export class AppModule { }