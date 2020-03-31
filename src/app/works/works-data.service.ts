import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class WorksDataService {


  comparisonItems = [];
  data;

  constructor(private http: HttpClient) { }




  getProducts(): Observable<any> {

    // return saved data for not loading it again
    if (this.data !== undefined) {
      return new Observable(observer => {
        observer.next(this.data);
      });
    }

    // https://portfolio-603c5.firebaseio.com/works.json
    return this.http.get<any[]>('https://portfolio-603c5.firebaseio.com/works.json')
      .pipe(map((compareItems: any) => {
          this.comparisonItems = compareItems;

          this.data = this.comparisonItems;
          return this.comparisonItems;
        })
      );
  }


  // https://portfolio-603c5.firebaseio.com/works/' + id + '.json
  getProduct(id: any): Observable<any> {
    return this.http.get<any>('https://portfolio-603c5.firebaseio.com/works/' + id + '.json');
  }



}
