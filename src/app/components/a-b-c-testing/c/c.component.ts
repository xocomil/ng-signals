import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-c',
  standalone: true,
  imports: [CommonModule],
  template: `<p>c works!</p>`,
  styleUrls: ['./c.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CComponent {}
