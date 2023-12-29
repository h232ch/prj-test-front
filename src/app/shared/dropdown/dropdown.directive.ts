import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: "appDropdown"
})
export class DropdownDirective {

  constructor() { }

  // @HostBinding('class.show') isShown = false;
  @HostBinding('class.open') isOpened = false;

  @HostListener('click') toggleOpen() {
    // this.isShown = !this.isShown;
    this.isOpened = !this.isOpened;
  }

}
