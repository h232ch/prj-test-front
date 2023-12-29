import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdownHeader]',
  exportAs: "appDropdownHeader"
})
export class DropdownHeaderDirective {

  constructor() { }

  @HostBinding('class.show') isShown = false;

  @HostListener('click') toggleShown() {
    this.isShown = !this.isShown;
  }
}
