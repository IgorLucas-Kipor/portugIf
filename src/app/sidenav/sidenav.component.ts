// sidenav.component.ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipConfigService } from '../services/tooltip-config.service';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  positionOptions: string[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  hideDelay = new FormControl(0);
  showTooltipOnClick = new FormControl(false);

  constructor(private tooltipConfigService: TooltipConfigService, private sidenavService: SidenavService) {
    // Subscribe to changes from the service
    this.tooltipConfigService.showTooltipOnClick$.subscribe(value => this.showTooltipOnClick.setValue(value));
    this.tooltipConfigService.hideDelay$.subscribe(value => this.hideDelay.setValue(value));
    this.tooltipConfigService.position$.subscribe(value => this.position.setValue(value));
  }

  get isSidenavOpen(): boolean {
    return this.sidenavService.getValue();
  }

  configureDelay() {
    if (this.showTooltipOnClick.value) {
      this.hideDelay.disable();
      this.hideDelay.setValue(0);
    } else {
      this.hideDelay.enable();
    }
  }

  applySettings() {
    this.tooltipConfigService.setShowTooltipOnClick(this.showTooltipOnClick.value);
    this.tooltipConfigService.setHideDelay(this.hideDelay.value);
    this.tooltipConfigService.setPosition(this.position.value);
  }
}
