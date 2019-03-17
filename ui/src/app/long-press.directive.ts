import { Directive, EventEmitter, HostListener, Input, Output, HostBinding } from '@angular/core';

@Directive({
  selector: '[longPress]',
})
export class LongPressDirective {
  @Input() longPress = 500;

  @Output() onLongPress: EventEmitter<any> = new EventEmitter();
  @Output() onLongPressing: EventEmitter<any> = new EventEmitter();
  @Output() onLongPressEnd: EventEmitter<any> = new EventEmitter();

  private pressing: boolean;
  private longPressing: boolean;
  private timeout: any;
  private mouseX = 0;
  private mouseY = 0;

  @HostBinding('class.press')
  get press() {
    return this.pressing;
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    // don't do right/middle clicks
    if (event.which && event.which !== 1) {
      return;
    }

    if (event.touches) {
      this.mouseX = event.touches[0].clientX;
      this.mouseY = event.touches[0].clientY;
    } else {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }

    this.pressing = true;
    this.longPressing = false;

    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.onLongPress.emit(event);
      this.loop(event);
    }, this.longPress);

    this.loop(event);
  }

  @HostListener('touchmove', ['$event'])
  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    if (this.pressing && !this.longPressing) {
      let xThres;
      let yThres;

      if (event.touches) {
        xThres = event.touches[0].clientX - this.mouseX > 10;
        yThres = event.touches[0].clientY - this.mouseY > 10;
      } else {
        xThres = event.clientX - this.mouseX > 10;
        yThres = event.clientY - this.mouseY > 10;
      }

      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  loop(event) {
    if (this.longPressing) {
      this.timeout = setTimeout(() => {
        this.onLongPressing.emit(event);
        this.loop(event);
      }, 50);
    }
  }

  endPress() {
    clearTimeout(this.timeout);
    this.longPressing = false;
    this.pressing = false;
    this.onLongPressEnd.emit(true);
  }

  @HostListener('mouseup')
  @HostListener('touchend')
  onMouseUp() {
    this.endPress();
  }
}
