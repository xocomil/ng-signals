import {
  DestroyRef,
  effect,
  InjectionToken,
  signal,
  WritableSignal,
} from '@angular/core';

const countFactory = (destroyRef: DestroyRef) => {
  const count = signal(0);
  destroyRef.onDestroy(() => {
    console.log('countFactory destroyed', count());
  });

  // console.log('destroy ref', ref);

  effect(() => {
    console.log('count updated to', count());
    // let seconds = 0;

    // const counter = setInterval(() => {
    //   seconds++;

    //   console.log(`It has been ${seconds} seconds since the last update.`);
    // }, 1000);

    // return () => {
    //   console.log('count effect clean up');

    //   clearInterval(counter);
    // };
  });

  return count;
};

export const COUNT_SIGNAL = new InjectionToken<WritableSignal<number>>(
  'COUNT_SIGNAL'
);

export const provideCountSignal = () => ({
  provide: COUNT_SIGNAL,
  useFactory: (destroyRef: DestroyRef) => countFactory(destroyRef),
  deps: [DestroyRef],
});
