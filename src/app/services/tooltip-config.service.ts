import { Injectable } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TooltipConfigService {
  private showTooltipOnClickSubject = new BehaviorSubject<boolean>(false);
  showTooltipOnClick$ = this.showTooltipOnClickSubject.asObservable();

  private hideDelaySubject = new BehaviorSubject<number>(0);
  hideDelay$ = this.hideDelaySubject.asObservable();

  private positionSubject = new BehaviorSubject<TooltipPosition>('after');
  position$ = this.positionSubject.asObservable();

  setShowTooltipOnClick(value: boolean) {
    this.showTooltipOnClickSubject.next(value);
  }

  setHideDelay(value: number) {
    this.hideDelaySubject.next(value);
  }

  setPosition(value: TooltipPosition) {
    this.positionSubject.next(value);
  }
}
