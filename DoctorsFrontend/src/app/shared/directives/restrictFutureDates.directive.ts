import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[restrictFutureDates]',
})
export class RestrictFutureDatesDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const input = event.target as HTMLInputElement;
    const maxDate = new Date().toISOString().slice(0, 10);
    if (input.value > maxDate) {
      input.value = maxDate;
    }
  }
}
