import {Directive, HostListener, HostBinding, Renderer2, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: "appDropdown",
})
export class DropdownDirective {
  // HostBinding can bind css
  @HostBinding('class.open') isOpen = false;
  @HostBinding('class.show') isShown = false;

  // HostListener can use javascript event
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    this.isShown = !this.isShown;
  }
}
