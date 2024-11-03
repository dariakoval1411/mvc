import { Routes } from '@angular/router';
import { CalculateComponent } from './common/calculate/calculate.component';
import { ToDoListComponent } from './common/to-do-list/to-do-list.component';
import { QuotesComponent } from './common/quotes/quotes.component';

export const routes: Routes = [
    {
      path: 'calculate',
      component: CalculateComponent,
      data: { title: 'Calculator'}
    },
    {
      path: 'to-do-list',
      component: ToDoListComponent,
      data: { title: 'Todo List'}
    },
    {
      path: 'quotes',
      component: QuotesComponent,
      data: { title: 'Quotes'}
    },
    {
      path: '',
      redirectTo: '/calculate',
      pathMatch: 'full'
    }
];