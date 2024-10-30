import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginFormComponent } from './shared/login-form/login-form.component';
import { DynamicFormComponent } from "../../shared/dynamic-form/dynamic-form.component";
import { CardModule } from 'primeng/card';
import { SignupFormComponent } from './shared/signup-form/signup-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DynamicFormComponent,
    CardModule
  ]
})
export class HomeModule { }
