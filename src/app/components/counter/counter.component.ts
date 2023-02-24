import { CommonModule } from "@angular/common";
import { Component, effect, inject, Input } from "@angular/core";
import { COUNT_SIGNAL } from "../../signals/counter.signal";
import { provideCountSignal } from "./../../signals/counter.signal";

@Component({
  selector: "app-counter",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>Current Count: {{ count() }}</div>
    <div>
      <button type="button" (click)="incrementCount()">+</button>
      <button type="button" (click)="decrementCount()">-</button>
      <button type="button" (click)="reset()">Reset</button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  providers: [provideCountSignal()],
})
export class CounterComponent {
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
