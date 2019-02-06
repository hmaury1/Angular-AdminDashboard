import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { SidebarModule } from './modules/shared/sidebar/sidebar.module';
import { FooterModule } from './modules/shared/footer/footer.module';
import { NavbarModule } from './modules/shared/navbar/navbar.module';
import { FixedpluginModule } from './modules/shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './modules/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './modules/layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { ConfigService } from './providers/config.service';
import { AuthGuard } from './providers/auth-guards';
import { ClientService } from './providers/client.service';
import { SpinnerModule, SpinnerService } from './modules/widgets/spinner/spinner.module';
import { NotificationService } from './modules/widgets/notification/notification.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './providers/http.service';
import { Helper } from './providers/helper.service';
import { HotTableModule } from 'angular-handsontable';
import { DialogModule } from './modules/widgets/dialog/dialog.module';
import { CheckboxComponent } from './modules/widgets/checkbox/checkbox.component';
import { BuyComponent } from './components/buy/buy.component';
import { MyTradeComponent } from './components/myTrade/myTrade.component';
import { AllTradeComponent } from './components/allTrade/allTrade.component';

/* app components: */

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule { }

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule,
    SpinnerModule,
    DialogModule,
    AgGridModule.withComponents([]),
    HotTableModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CheckboxComponent,
    BuyComponent,
    MyTradeComponent,
    AllTradeComponent
  ],
  entryComponents: [
    CheckboxComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: function configServiceFactory(config: ConfigService) {
        return () => config.getConfiguration();
      },
      deps: [ConfigService],
      multi: true
    },
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpService,
      multi: true,
    },
    ClientService,
    NotificationService,
    SpinnerService,
    Helper
  ]
})
export class CumbalModule { }
