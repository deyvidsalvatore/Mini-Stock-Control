import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogService } from 'primeng/dynamicdialog';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
  constructor(private cookie: CookieService, private router: Router) {
  }

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    this.router.navigate(['/auth/login']);
  }
}
