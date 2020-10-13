import { HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable({
  providedIn: 'root'
})
export class Api {
  url = environment.backendUri;
  directHttp: HttpClient;

  constructor(
    public http: HttpClient,
    private handler: HttpBackend

  ) {
    this.directHttp = new HttpClient(this.handler);
  }

  // getLists(endpoint: string): Observable<Category[]> {
  //   return this.http.get<Category[]>(this.url + '/' + endpoint);
  // }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params && params.single) {
      endpoint = endpoint + params.value;
    } else {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  directGet(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params && params.single) {
      endpoint = endpoint + params.value;
    } else {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    return this.directHttp.get(this.url + '/' + endpoint, reqOpts);
  }

  directPost(endpoint: string, body: any, reqOpts?: any) {
    return this.directHttp.post(this.url + '/' + endpoint, body, { observe: 'response' });
  }
}
