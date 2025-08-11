import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // ✅ use async animations
// If you prefer classic: import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr'; // ✅ Toastr
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideHttpClient(),

    // ✅ animations (choose ONE of these approaches)
    provideAnimationsAsync(),
    // OR: provideAnimations(),

    // ✅ Toastr (global options optional)
    provideToastr({
      positionClass: 'toast-top-center',
      timeOut: 3000,
      closeButton: true
    }),
  ]
};
