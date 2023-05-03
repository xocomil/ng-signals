import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-d',
  standalone: true,
  imports: [CommonModule],
  template: `<p>d works!</p>`,
  styleUrls: ['./d.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DComponent {}
