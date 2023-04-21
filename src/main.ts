import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { routes } from './app/app-routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation()
    ),
  ],
});
