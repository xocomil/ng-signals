import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [CommonModule],
  template: `<p>a works!</p>`,
  styleUrls: ['./a.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AComponent {}
