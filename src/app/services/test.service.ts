import {
  DestroyRef,
  inject,
  Injectable,
  InjectionToken,
  Provider,
} from "@angular/core";

@Injectable()
export class TestService {
  readonly #otherService = inject(OtherService);

  callEndpoint(endpoint: string = "old-test-service") {
    this.#otherService.callApi(endpoint);
  }
}

@Injectable()
export class OtherService {
  callApi(endpoint: string = "default") {
    console.log("endpoint called", endpoint);
  }

  heavyCleanup() {
    console.log("heavyCleanup called");
  }
}

export const pokemonApiService = () => ({
  callApi(endpoint: string = "allPokemon") {
    console.log("pokemon called", `https://pokeapi.co/api/v2/${endpoint}`);
  },
});

export type ApiService = {
  callApi(endpoint: string): void;
};

export const testServiceFactory = (otherService: ApiService) => ({
  callEndpoint(endpoint: string = "notDefault") {
    otherService.callApi(endpoint);
  },
});

export type NewTestService = ReturnType<typeof testServiceFactory>;

// const otherApi = testServiceFactory(inject(OtherService));

// const pokeApi = testServiceFactory(pokemonApiService());

export const POKE_SERVICE = new InjectionToken<NewTestService>(
  "Pokemon Service"
);

export const providePokeService = (): Provider => ({
  provide: POKE_SERVICE,
  useFactory: () => testServiceFactory(pokemonApiService()),
});

export const OTHER_SERVICE = new InjectionToken<NewTestService>(
  "Other Service"
);

const otherServiceFactory = () => (destroyRef: DestroyRef) => () =>
  testServiceFactory(inject(OtherService));

export const provideOtherService = (): Provider => ({
  provide: OTHER_SERVICE,
  useFactory: otherServiceFactory,
  deps: [DestroyRef],
});
