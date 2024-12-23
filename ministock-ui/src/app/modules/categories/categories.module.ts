import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { CategoriesTableComponent } from './pages/categories/categories-table/categories-table.component';
import { ToolbarNavigationComponent } from "../../shared/toolbar-navigation/toolbar-navigation.component";

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
];

@NgModule({
  declarations: [CategoriesComponent, CategoriesTableComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PRIMENG_MODULES,
    ToolbarNavigationComponent
],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class CategoriesModule {}
