import { effect, InjectionToken, signal, WritableSignal } from "@angular/core";

const countFactory = () => {
  const count = signal(0);
  effect(() => {
    console.log("count updated to", count());
  });

  return count;
};

export const COUNT_SIGNAL = new InjectionToken<WritableSignal<number>>(
  "COUNT_SIGNAL"
);

export const provideCountSignal = () => ({
  provide: COUNT_SIGNAL,
  useFactory: countFactory,
});
