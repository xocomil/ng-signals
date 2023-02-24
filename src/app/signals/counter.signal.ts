import { effect, InjectionToken, SettableSignal, signal } from "@angular/core";

const countFactory = () => {
  const count = signal(0);
  effect(() => {
    console.log("count updated to", count());
  });

  return count;
};

export const COUNT_SIGNAL = new InjectionToken<SettableSignal<number>>(
  "COUNT_SIGNAL"
);

export const provideCountSignal = () => ({
  provide: COUNT_SIGNAL,
  useFactory: countFactory,
});
