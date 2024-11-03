import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { ToolbarNavigationComponent } from '../../shared/toolbar-navigation/toolbar-navigation.component';
import { MessageService } from 'primeng/api';
import { ProductsService } from '../../core/services/products.service';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule,
    ChartModule,
    ToolbarNavigationComponent
  ],
  providers: [ProductsService, MessageService]
})
export class DashboardModule { }
