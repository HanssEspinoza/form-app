import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SideMenuComponent } from '@shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideMenuComponent],
  template: `
    <div class="row mt-5">
      <div class="col">
        <router-outlet />
      </div>
      <div class="col-12 col-sm-4">
        <app-side-menu />
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
