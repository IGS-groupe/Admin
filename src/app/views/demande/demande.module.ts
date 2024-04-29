import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeComponent } from './demande.component';

@NgModule({
  declarations: [
    DemandeComponent
  ],
  imports: [
    CommonModule // Make sure CommonModule is imported here
  ]
})
export class DemandeModule { }
