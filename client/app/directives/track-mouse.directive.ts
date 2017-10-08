import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[trackMouse]'
})

/**
 * Directive to track where the mouse is while it is selecting.
 * Also tracks when a click is made, without confusing it with a selection.
 */
export class TrackMouseDirective {
  private isMouseDown: boolean = false;
  private isSelecting: boolean = false;
  private initialMouseDownX: number = 0;

  /* Events intended to be received by the timeline. */
  @Output() selectionStart: EventEmitter<Event> = new EventEmitter();
  @Output() selectionEnd: EventEmitter<Event> = new EventEmitter();
  @Output() selecting: EventEmitter<Event> = new EventEmitter();
  @Output() clicked: EventEmitter<Event> = new EventEmitter();
  @Output() dblclicked: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    // Starts looking for drag once mouse is down
    this.initialMouseDownX = event.layerX;
    this.isMouseDown = true;
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    // Output event to parent if already selecting
    if (this.isSelecting) {
      this.selecting.emit(event);
    }

    // Start selecting if mouse btn is down and moving mouse
    else if (this.isMouseDown && event.layerX != this.initialMouseDownX) {
      this.isSelecting = true; 
      this.selectionStart.emit(event);
    }
  }
  
  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    this.isMouseDown = false;

    // Normal click occurs
    if (event.layerX == this.initialMouseDownX) {
      this.clicked.emit(event);
    }

    // Selection occurs
    else {
      if (this.isSelecting) {
        this.selectionEnd.emit(event);
      }
      this.isSelecting = false;
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseOff(event) {
    // Stop selecting once mouse leaves boundary
    this.onMouseUp(event);
  }

  @HostListener('dblclick', ['$event']) onDoubleClick(event) {
    this.dblclicked.emit(event);
  }
}
