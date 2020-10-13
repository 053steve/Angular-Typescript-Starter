import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { TableDataSource } from '../common/interfaces/common.interface';
import { AlertService } from '../services/alert.service';
import { USER_TYPE } from '../common/constants';
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})


export class AdminUserComponent implements OnInit, AfterViewInit {
  constructor(public dialog: MatDialog,
              public alertService: AlertService,
              public userService: UserService) { }

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'username', 'role', 'status', 'action'];
  dataSource = new MatTableDataSource();
  tableOptions: TableDataSource;
  pageSizeOptions = ['10', '20', '30'];
  userLength: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  ngOnInit() {
    console.log('user');
    this.setupTableOptions();
    this.start();
  }

  start() {
    this.getUser();
  }

  async getUser(pageIndex?: number) {
    if (pageIndex) {
        this.tableOptions.pageNumber = pageIndex;
      } else {
        this.setupTableOptions();
      }
    const result: any = await this.userService.getUserByType(USER_TYPE.STAFF, this.tableOptions);
    if (result.success) {
      this.dataSource = new MatTableDataSource(result.payload.users);
      this.userLength = result.payload.userLength;
    }
  }

  setupTableOptions() {
    this.tableOptions = {
      pageNumber: 0,
      pageSize: 10,
      filter: null,
      sortOrder: 'desc'
    };
  }

  async applyFilter(data) {
    this.setupTableOptions();
    if (data.length === 0) {
          this.getUser(0);
      }

    if (data.length > 2) {
      const result = await this.userService.getUserBySearch(data, this.tableOptions) as any;
      if (result) {
          this.dataSource = new MatTableDataSource(result.users);
          if (result.users.length === 0) {
              this.userLength = 0;
          } else {
              this.userLength = result.userformLengthLength;
          }
      } else {
          this.userLength = 0;
      }
    }
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }

  onPageChanged(pageObj: PageEvent) {
    if (pageObj.pageIndex) {
      this.tableOptions.pageNumber = pageObj.pageIndex;
  } else {
      this.setupTableOptions();
  }
    this.getUser(pageObj.pageIndex);
  }

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(UserDialogContent, {
        data: obj,
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result.event === 'Add') {
            this.addRowData(result.data);
        } else if (result.event === 'Update') {
            this.updateRowData(result.data);
        } else if (result.event === 'Delete') {
            this.deleteRowData(result.data);
        }
    });
  }

  // tslint:disable-next-line:variable-name
  async addRowData(row_obj: any) {
    const data = await this.userService.createUser(row_obj);
    if (data) {
        this.alertService.success('ทำรายการสำเร็จ');
        this.getUser();
     }

  }
  // tslint:disable-next-line:variable-name
  async updateRowData(row_obj: any) {
    const data = await this.userService.updateUser(row_obj);
    if (data) {
        this.alertService.success('ทำรายการสำเร็จ');
        this.getUser();
    }
  }
  // tslint:disable-next-line:variable-name
  async deleteRowData(row_obj: any) {
    const data = await this.userService.deleteuser(row_obj);
    if (data) {
      this.alertService.success('ทำรายการสำเร็จ');
      this.getUser();
    }
  }
}


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'user-dialog',
  templateUrl: 'user-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class UserDialogContent {
  action: string;
  // tslint:disable-next-line:variable-name
  local_data: any;

  constructor(
      public dialogRef: MatDialogRef<UserDialogContent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: Location) {
      this.local_data = { ...data };
      this.action = this.local_data.action;
  }

  doAction() {
      this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
      this.dialogRef.close({ event: 'Cancel' });
  }

  setAll(event) {
    this.local_data.status = event;
  }

  checkDisabled(data) {
    if (data.action === 'Add' || data.action === 'Update') {
        if (!!data.username && !!data.firstName && !!data.lastName && !!data.email) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
  }

}




