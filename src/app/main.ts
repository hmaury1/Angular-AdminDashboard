import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CumbalModule } from './app.module';
import { enableProdMode } from '@angular/core';

enableProdMode();
platformBrowserDynamic().bootstrapModule(CumbalModule);
