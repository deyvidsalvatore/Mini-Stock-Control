import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogService } from 'primeng/dynamicdialog';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductFormComponent } from '../../modules/products/product-form/product-form.component';
import { ProductEvent } from '../enums/products/product.event';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrl: './toolbar-navigation.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToolbarModule,
    ButtonModule,
    CardModule
  ],
  providers: [DialogService, CurrencyPipe]
})
export class ToolbarNavigationComponent {
  constructor(private cookie: CookieService, private router: Router, private dialogService: DialogService) {
  }

  handleSaleProduct(): void {
    this.dialogService.open(ProductFormComponent, {
      header: ProductEvent.SALE_PRODUCT_EVENT,
      width: '70%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 1000,
      maximizable: true,
      data: {
        event: { action: ProductEvent.SALE_PRODUCT_EVENT }
      }
    })
  }

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    this.router.navigate(['/auth/login']);
  }
}
