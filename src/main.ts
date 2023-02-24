import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideCountSignal } from "./app/signals/counter.signal";

bootstrapApplication(AppComponent, { providers: [provideCountSignal()] });
