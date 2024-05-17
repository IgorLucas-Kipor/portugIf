// sidenav.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenavOpenSubject = new BehaviorSubject<boolean>(true);
  sidenavOpen$ = this.sidenavOpenSubject.asObservable();

  constructor() {}

  toggle() {
    this.sidenavOpenSubject.next(!this.sidenavOpenSubject.value);
  }

  getValue(): boolean {
    return this.sidenavOpenSubject.value;
  }
}
