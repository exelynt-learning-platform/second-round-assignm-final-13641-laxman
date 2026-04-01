// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideStore } from '@ngrx/store';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore()]
// };

import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. Import your Store, Effects, and Reducer
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { chatReducer } from './storeMsg/chat.reducer'; // Ensure path is correct
import { ChatEffects } from './storeMsg/chat.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    
    // 2. Register the 'chat' key so the Selector can find it
    provideStore({ chat: chatReducer }), 
    
    // 3. Register the Effects so they can listen for actions
    provideEffects([ChatEffects]),
    
    // 4. (Optional) Helpful for debugging
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};