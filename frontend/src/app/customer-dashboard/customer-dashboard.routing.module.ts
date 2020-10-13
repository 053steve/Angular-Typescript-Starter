import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard.component';

const routes: Routes = [
  {
    path: 'user',
    component: CustomerDashboardComponent,
    children: [
      // {
      //   path: 'products',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('../customer-product/customer-product.module').then(m => m.CustomerProductModule)
      //     }
      //   ]
      // }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
