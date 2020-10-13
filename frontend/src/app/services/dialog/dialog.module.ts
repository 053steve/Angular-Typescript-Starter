import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { DialogsService } from './dialog.service';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PortalModule,
    AngularMaterialModule
  ],
  entryComponents: [
  ],
  providers: [
    DialogsService
  ]
})
export class DialogsModule { }
