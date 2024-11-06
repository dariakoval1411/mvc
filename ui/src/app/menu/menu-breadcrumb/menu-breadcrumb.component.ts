import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as rx from 'rxjs/operators';

@Component({
  selector: 'ada-menu-breadcrumb',
  templateUrl: './menu-breadcrumb.component.html',
  styleUrl: './menu-breadcrumb.component.scss'
})
export class MenuBreadcrumbComponent {

  title: Observable<string[]>;

  constructor(
    router: Router
  ) {
    this.title = router.events.pipe(
      rx.filter(event => event instanceof NavigationEnd),
      rx.map(() => {
        const segments = ['MVC'];
        let node: ActivatedRouteSnapshot = router.routerState.snapshot.root;

        do {
          if (node.firstChild) {
            node = node.firstChild;
            segments.push(node.data['titleBreadcrumb'] || node.data['title']);
          }
        } while (node?.firstChild);

        return segments;
      })
    );
  }
}
