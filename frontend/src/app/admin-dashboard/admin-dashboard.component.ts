import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { USER_TYPE } from '../common/constants';
import { LoaderService } from '../services/loader.service';

import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MenuItems } from '../shared/menu-items/menu-items';
import { TableDataSource } from '../common/interfaces/common.interface';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit, OnDestroy {
  parentIndex = 0;
  childIndex = 0;
  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green = true;
  blue = false;
  dark = false;
  minisidebar = false;
  boxed = false;
  danger = false;
  showHide = false;
  url = '';
  sidebarOpened = false;
  status = false;
  itemSelect: number[] = [];
  isSuccess = false;
  public showSearch = false;
  tableOptions: TableDataSource;
  public config: PerfectScrollbarConfigInterface = {};
  userType: string;
  // tslint:disable-next-line:variable-name
  private _mobileQueryListener: () => void;
  isStaff: boolean;
  constructor(
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public loaderService: LoaderService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  clickEvent() {
    this.status = !this.status;
  }

  async ngOnInit() {
    this.setupTableOptions();
  }

  setupTableOptions() {
    this.tableOptions = {
        pageNumber: 0,
        pageSize: 100,
        filter: null,
        sortOrder: 'desc'
    };
  }

z
  setClickedRow(i: number, j: number) {
    this.parentIndex = i;
    this.childIndex = j;
  }
  subclickEvent() {
    this.status = true;
  }
  scrollToTop() {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0
    });
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  test() {
    console.log('test');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
