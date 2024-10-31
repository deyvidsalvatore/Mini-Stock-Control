import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarNavigationComponent } from './toolbar-navigation/toolbar-navigation.component';

@NgModule({
  declarations: [
    ToolbarNavigationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ToolbarModule,
    CardModule,
    ButtonModule
  ],
  providers: [DialogService, CurrencyPipe]
})
export class SharedModule { }
