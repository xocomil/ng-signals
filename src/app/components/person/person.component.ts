import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

type Dino = {
  dinoName: string;
  hasFeathers: boolean;
  age: number;
  favoriteColor: string;
};

@Component({
  selector: "app-person",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` <form>
      <label
        >First name:
        <input name="firstName" type="text" [(ngModel)]="dinoName" /></label
      ><br />
      <label
        >Has Feathers:
        <input name="hasFeathers" type="checkbox" [(ngModel)]="hasFeathers"
      /></label>
    </form>
    <pre>{{ dino() | json }}</pre>`,
  styles: [
    `
      :host {
        display: block;

        margin: 1rem auto;
        padding: 2rem;
        border: 1px solid hsl(120deg 90% 30%);
        border-radius: 0.6rem;

        > div {
          margin: 0.5rem 0;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {
  #destroyRef = inject(DestroyRef).onDestroy(() => {
    console.log("PersonComponent destroyed");
  });

  protected readonly dino = signal<Dino>({
    dinoName: "Velociraptor",
    hasFeathers: true,
    age: 42,
    favoriteColor: "blue",
  });

  get dinoName(): string {
    return computed(() => this.dino().dinoName)();
  }
  set dinoName(value: string) {
    this.dino.mutate((dino) => {
      dino.dinoName = value;
    });
  }

  get hasFeathers(): boolean {
    return computed(() => this.dino().hasFeathers)();
  }
  set hasFeathers(value: boolean) {
    this.dino.mutate((dino) => {
      dino.hasFeathers = value;
    });
  }
}
