import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})

export class TimelineComponent implements OnInit {
  /* On player initialization, these values should be set. */
  @Input() playHeadPos: number = 0;
  @Input() width: number = screen.width;
  @Input() height: number = screen.height/10;

  /* Parent component will handle anything to do with the actual player. */
  @Output() selection: EventEmitter<Event> = new EventEmitter();
  @Output() changePlayHeadPos: EventEmitter<Event> = new EventEmitter();

  private selectionStartPos: number = 0;
  private selectionEndPos: number = 0;
  private isSelecting: boolean = false;

  constructor() {
  }

  ngOnInit() {
    // TODO implement
  }

  /**
   * Resets the selection start and end coordinates.
   */
  private resetSelection() {
    this.isSelecting = false;
    this.selectionEndPos = 0;
    this.selectionStartPos = 0;
  }

  /**
   * Executes when the mouse moves during a selection.
   * @param event mouse event data
   */
  handleSelecting(event) {
    this.selectionEndPos = event.layerX;
    this.playHeadPos = event.layerX;
    this.changePlayHeadPos.emit(event);
  }

  /**
   * Executes when the mouse is starting to make a selection.
   * @param event mouse event data
   */
  handleSelectionStart(event) {
    this.selectionStartPos = event.layerX;
    this.selectionEndPos = event.layerX;
    this.isSelecting = true;
  }

  /**
   * Executes on mouseup at the end of a selection.
   * @param event mouse event data
   */
  handleSelectionEnd(event) {
    this.selection.emit(event);
  }

  /**
   * Executes on mouseclick; not including a selection.
   * @param event mouse event data
   */
  handleClick(event) {
    this.resetSelection();
    this.playHeadPos = event.layerX;
    this.changePlayHeadPos.emit(event);
  }

  handleDoubleClick(event) {
    // TODO: handle
  }

}
