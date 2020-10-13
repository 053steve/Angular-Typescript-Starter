import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isShow: boolean;
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state) => {
      this.isShow = state.show;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
