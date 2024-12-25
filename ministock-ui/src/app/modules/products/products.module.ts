import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarNavigationComponent } from '../../shared/toolbar-navigation/toolbar-navigation.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { ToastModule } from 'primeng/toast';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from '../../shared/shared.module';

const PRIMENG_MODULES = [
  CardModule,
  ButtonModule,
  TableModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  DynamicDialogModule,
  DropdownModule,
  ConfirmDialogModule,
  TooltipModule,
  ToastModule,
  ToolbarNavigationComponent,
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsTableComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    SharedModule,
    PRIMENG_MODULES,
],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class ProductsModule {}
