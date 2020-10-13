import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExcelService } from '../services/excel.service';
import { BlankComponent } from '../common/components/blank-component/BlankComponent';
import { LoaderComponent } from '../common/components/loader/loader.component';
import { AlertComponent } from '../common/components/alert/alert.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DialogComponent } from '../common/components/dialogs/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogsModule } from '../services/dialog/dialog.module';
import { MenuItems } from './menu-items/menu-items';
import { SpinnerComponent } from '../shared/spinner.component';
import { UserDialogContent } from '../admin-user/admin-user.component';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';

@NgModule({
  declarations: [
    BlankComponent,
    LoaderComponent,
    AlertComponent,
    DialogComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SpinnerComponent,
    UserDialogContent,
  ],
  providers: [
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    ExcelService,
    NgxImageCompressService,
    MenuItems
  ],
  imports: [FormsModule,
          ReactiveFormsModule ,
          CommonModule,
          AngularMaterialModule,
          DialogsModule,
          FlexLayoutModule],
  exports: [
          FormsModule,
          ReactiveFormsModule,
          CommonModule,
          AngularMaterialModule,
          DialogsModule,
          FlexLayoutModule,
          LoaderComponent,
          AlertComponent,
          BlankComponent,
          UserDialogContent,
          AccordionAnchorDirective,
          AccordionLinkDirective,
          AccordionDirective ],
  entryComponents: [
    AlertComponent,
    DialogComponent,
    UserDialogContent,
  ],
})
export class SharedModule {
}
