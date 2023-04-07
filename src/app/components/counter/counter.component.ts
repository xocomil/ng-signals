import { CommonModule, DOCUMENT, JsonPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  Input,
  signal,
} from '@angular/core';
import { COUNT_SIGNAL, provideCountSignal } from '../../signals/counter.signal';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  template: `
    <div>Current Count: {{ count() }}</div>
    <div>
      <button type="button" (click)="incrementCount()">+</button>
      <button type="button" (click)="decrementCount()">-</button>
      <button type="button" (click)="reset()">Reset</button>
    </div>
    <div>Mouse Position: {{ mousePosition() | json }}</div>
  `,
  styles: [
    `
      :host {
        display: block;

        margin: 1rem auto;
        padding: 2rem;
        border: 1px solid hsl(240deg 90% 50%);
        border-radius: 0.6rem;

        > div {
          margin: 0.5rem 0;
        }
      }
    `,
  ],
  providers: [provideCountSignal()],
})
export class CounterComponent {
  #destroyRef = inject(DestroyRef).onDestroy(() => {
    console.log('CounterComponent destroyed');
  });

  protected readonly mousePosition = injectMousePosition();

  #initialValue = 0;
  readonly #componentId = window.crypto.randomUUID();

  protected readonly count = inject(COUNT_SIGNAL);

  @Input() get initialValue(): number {
    return this.#initialValue;
  }
  set initialValue(value: number) {
    this.#initialValue = value;

    this.count.set(this.#initialValue);
  }

  protected incrementCount() {
    this.count.update((c) => c + 1);
  }
  protected decrementCount() {
    this.count.update((c) => c - 1);
  }

  // readonly #cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      window.localStorage.setItem(
        `${this.#componentId} value`,
        this.count().toString()
      );
    });
  }

  protected reset() {
    this.count.set(this.#initialValue);
  }
}

const injectMousePosition = () => {
  const mousePosition = signal({ x: 0, y: 0 });
  const document = inject(DOCUMENT);

  const updateMousePosition = (mouseEvent: MouseEvent) => {
    mousePosition.set({ x: mouseEvent.clientX, y: mouseEvent.clientY });
  };

  effect(() => {
    document.addEventListener('mousemove', updateMousePosition);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  });

  return () => mousePosition();
};
