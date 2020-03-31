import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {

  menuBgState: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() { }

}
