import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './modules/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './modules/layouts/auth/auth-layout.component';
import { AuthGuard } from './providers/auth-guards';
import { BuyComponent } from './components/buy/buy.component';
import { AllTradeComponent } from './components/allTrade/allTrade.component';
import { MyTradeComponent } from './components/myTrade/myTrade.component';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        {
            path: '',
            loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
        },
        /*{
            path: 'components',
            loadChildren: './modules/components/components.module#ComponentsModule'
        }, {
            path: 'forms',
            loadChildren: './modules/forms/forms.module#Forms'
        }, {
            path: 'tables',
            loadChildren: './modules/tables/tables.module#TablesModule'
        }, {
            path: 'maps',
            loadChildren: './modules/maps/maps.module#MapsModule'
        }, {
            path: 'widgets',
            loadChildren: './modules/widgets/widgets.module#WidgetsModule'
        }, {
            path: 'charts',
            loadChildren: './modules/charts/charts.module#ChartsModule'
        }, {
            path: 'calendar',
            loadChildren: './modules/calendar/calendar.module#CalendarModule'
        }, {
            path: '',
            loadChildren: './modules/userpage/user.module#UserModule'
        }, {
            path: '',
            loadChildren: './modules/timeline/timeline.module#TimelineModule'
        }*/
        {
            path: 'buy',
            component: BuyComponent
        },
        {
            path: 'all-trades',
            component: AllTradeComponent
        },
        {
            path: 'my-trades',
            component: MyTradeComponent
        },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'pages',
      loadChildren: './modules/pages/pages.module#PagesModule'
    }]
  }
];
