import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: () => import('../admin-user/admin-user.module').then(m => m.AdminUserModule)
          }
        ]
      }
      // {
      //   path: '',
      //   redirectTo: '/login',
      //   pathMatch: 'full'
      // }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/dashboard/management',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
