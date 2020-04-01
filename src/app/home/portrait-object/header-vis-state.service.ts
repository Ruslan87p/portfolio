import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderVisStateService {

  counter: any;

  loadingCounter = new BehaviorSubject(this.counter);
  data = this.loadingCounter.asObservable();

  constructor() { }

  updatedDataSelection(data: any){
    this.loadingCounter.next(data);
  }

}
