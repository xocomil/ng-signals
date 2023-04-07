import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { PersonComponent } from './components/person/person.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>Welcome to {{ title }}!</h1>
    </div>
    <div>
      <a routerLink="/counter">Counter</a>
      <a routerLink="/person">Person</a>
    </div>
    <router-outlet />
  `,
  styleUrls: ['./app.component.scss'],
  imports: [CounterComponent, PersonComponent, RouterOutlet, RouterLink],
})
export class AppComponent {
  title = 'ng-signals';
}
