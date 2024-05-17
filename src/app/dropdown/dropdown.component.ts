import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { dropdownAnimations } from "../../animations/dropdown-animations";
import { timeout } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  animations: [dropdownAnimations],
})
export class DropdownComponent implements AfterViewInit {
  isDropdownOpen: boolean = false;
  @Input() dropdownTitle!: string;
  @Input() dropdownContent!: string;
  @ViewChild('dropdown') dropdownElement!: ElementRef<HTMLDetailsElement>;
  @ViewChild('dropdownText') dropdownContentRef!: ElementRef<HTMLElement>;
  @ViewChild('dropdownItem') dropdownItem!: ElementRef<HTMLElement>;


  constructor(private readonly elementRef: ElementRef) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.updateSpacing();
  }

  ngAfterViewInit(): void {
    this.updateSpacing();
  }

  updateSpacing(): void {
    const dropdownHeight = this.dropdownContentRef.nativeElement.offsetHeight;
    const elementBelowDropdown = this.dropdownItem.nativeElement;
    if (this.isDropdownOpen && elementBelowDropdown) {
      elementBelowDropdown.style.height = (dropdownHeight - 100) + 'px';
    } else if (!this.isDropdownOpen && elementBelowDropdown) {
      elementBelowDropdown.style.height = '0';
    }
  }
}