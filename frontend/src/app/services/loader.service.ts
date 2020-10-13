import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoaderService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    private loaderSubject = new Subject<any>();
    public loaderState = this.loaderSubject.asObservable();

    constructor(private router: Router) { }

    showLoader(isShow: boolean) {
        this.loaderSubject.next({ show: isShow } as any);
    }

    getShow(): Observable<any> {
        return this.loaderSubject.asObservable();
    }
}
