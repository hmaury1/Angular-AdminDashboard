import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { ClientService } from '../../providers/client.service';
import { NotificationService } from '../../modules/widgets/notification/notification.module';
import { Helper } from '../../providers/helper.service';
import { SpinnerService } from '../../modules/widgets/spinner/spinner.module';

@Component({
  selector: 'app-all-trades',
  templateUrl: './allTrade.component.html',
  providers: []
})
export class AllTradeComponent {

}
