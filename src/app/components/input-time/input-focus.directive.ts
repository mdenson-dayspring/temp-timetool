import {Directive, ElementRef, OnInit, Renderer} from '@angular/core';

@Directive({
  selector : 'input[focus]'
})
export class InputFocusDirective implements OnInit {
  constructor(public renderer: Renderer, public elementRef: ElementRef) {}

  ngOnInit() {
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement, 'focus', []);
  }
}
