import { Component, EventEmitter, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { flatMap } from 'lodash-es';
import { MenuItem, MenuSection } from '../menu-model';

@Component({
  selector: 'ada-menu-side',
  templateUrl: './menu-side.component.html',
  styleUrl: './menu-side.component.scss'
})
export class MenuSideComponent {

  @Output()
  closeSideNav = new EventEmitter<unknown>();

  selectors: MenuItem[][] = [
    [
      { link: '/' }
    ],
    [
      { link: '/payments' },
      { link: '/invoices' },
      { link: '/charts' }
    ],
  ];

  menu: MenuSection[] = [];

  constructor(
    private router: Router,
  ) {
    const menuItems = this.processRoutes('', {}, router.config)
    this.menu = this.processMenu(menuItems);
  }

  processRoutes(prefix: string, parentData: { [key: string]: unknown }, routes?: Route[]): MenuItem[] {
    return flatMap(routes, route => {
      const self = 'data' in route ?
        [<MenuItem>{
          link: `${prefix}/${route.path}`,
          ...parentData,
          ...route.data
        }] :
        [];
      const children = 'children' in route ?
        this.processRoutes(`${prefix}/${route.path}`, {
          ...parentData,
          ...route.data
        }, route.children) :
        [];
      return [...self, ...children];
    });
  }

  processMenu(menuItems: MenuItem[]): MenuSection[] {
    return this.selectors.map(section =>
      flatMap(section, item => {
        const menuItem = item.link ? menuItems.find(mi => mi.link === item.link) : item;
        if (menuItem) {
          return [menuItem];
        } else {
          return [];
        }
      })
    ).filter(section =>
      section.length > 0
    ).map((section, index) => (<MenuSection>{
      items: section,
      hr: index > 0
    }));
  }

  clickLink() {
    this.closeSideNav.emit();
  }
}