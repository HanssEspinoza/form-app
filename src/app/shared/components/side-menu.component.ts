import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <h2>Paginas</h2>
    <hr />

    <h3 class="mt-3">Reactive</h3>

    <ul class="list-group">
      @for (item of reactiveMenu(); track item) {
      <li
        class="list-group-item"
        [routerLink]="[item.route]"
        routerLinkActive="active"
      >
        {{ item.title }}
      </li>
      }
    </ul>

    <h3 class="mt-3">Validaciones</h3>

    <ul class="list-group">
      @for (item of authMenu(); track item) {
      <li
        class="list-group-item"
        [routerLink]="[item.route]"
        routerLinkActive="active"
      >
        {{ item.title }}
      </li>
      }
    </ul>
  `,
  styles: ``,
})
export class SideMenuComponent {
  public reactiveMenu = signal<MenuItem[]>([
    {
      title: 'Básicos',
      route: '/reactive/basic',
    },
    {
      title: 'Dinámicos',
      route: '/reactive/dynamic',
    },
    {
      title: 'Switches',
      route: '/reactive/switches',
    },
  ]);

  public authMenu = signal<MenuItem[]>([
    {
      title: 'Registro',
      route: '/register',
    },
    {
      title: 'Países',
      route: '/country',
    },
  ]);
}
