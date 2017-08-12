import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[trackMouse]'
})

/**
 * Directive to track where the mouse is while it is dragging.
 * Also tracks when a click is made, without confusing it with a drag.
 */
export class TrackMouseDirective {
  private isMouseDown: boolean;
  private isDragging: boolean;
  private initPosMouseDown: number;

  /* Events intended to be received by the timeline. */
  @Output() startDrag: EventEmitter<Event> = new EventEmitter();
  @Output() endDrag: EventEmitter<Event> = new EventEmitter();
  @Output() dragging: EventEmitter<Event> = new EventEmitter();
  @Output() clicked: EventEmitter<Event> = new EventEmitter();
  @Output() dblclicked: EventEmitter<Event> = new EventEmitter();

  constructor() {
    this.isMouseDown = false;
    this.isDragging = false;
    this.initPosMouseDown = 0; 
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event): void {
    // Starts looking for drag once mouse is down
    this.initPosMouseDown = event.layerX;
    this.isMouseDown = true;
  }
  
  @HostListener('mouseup', ['$event']) onMouseUp(event): void {
    // Normal click occurs
    this.isMouseDown = false;
    if (event.layerX == this.initPosMouseDown) {
      this.clicked.emit(event);
    }
    else {
      // Stops dragging
      if (this.isDragging) {
        this.endDrag.emit(event);
      }
      this.isDragging = false;
    }
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event): void {
    // Output event to parent if already dragging
    if (this.isDragging) {
      this.dragging.emit(event);
    }

    // Start dragging if mouse btn is down and moving mouse
    else if (this.isMouseDown && event.layerX != this.initPosMouseDown) {
      this.isDragging = true; 
      this.startDrag.emit(event);
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseOff(event) {
    // Stop dragging once mouse leaves boundary
    this.onMouseUp(event);
  }

  @HostListener('dblclick', ['$event']) onDoubleClick(event) {
    this.dblclicked.emit(event);
  }
}
