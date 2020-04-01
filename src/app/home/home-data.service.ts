import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {

  baseURL = 'http://localhost:3000/home';
  comparisonItems = [];
  data = {};

  constructor(private http: HttpClient) { }

  getHomeData(): Observable<any> {

    // return saved data list by language, for not loading it again
    if (this.data !== undefined) {
      return new Observable(observer => {
        observer.next(this.data);
      });
    }

    return this.http.get(this.baseURL + '.json')
      .pipe(map((compareItems: any) => {

        this.comparisonItems = Object.keys(compareItems);
        console.log(compareItems);

        this.data = this.comparisonItems;
        return this.comparisonItems;
      }));
  }

}
