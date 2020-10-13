import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { USER_TYPE } from './common/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'BOQ Management';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: any,
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.authenticationState.subscribe(async state => {
      if (state) {
        const user = await this.authService.getLocalUser();
        const userData = JSON.parse(user);

        this.router.navigate(['/dashboard/user']);

      }
    });
  }

  public ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      const bases = this.document.getElementsByTagName('base');
      if (bases.length > 0) {
        bases[0].setAttribute('href', environment.baseHref);
      }
    }
  }


}
