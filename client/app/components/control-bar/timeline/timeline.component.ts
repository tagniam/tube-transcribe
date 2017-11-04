import { Component, OnInit, HostListener, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})

export class TimelineComponent implements OnInit {
  @ViewChild(PerfectScrollbarDirective) scrollbar: PerfectScrollbarDirective;

  get playHeadPos(): number {
    return this._playHeadPos;
  }

  @Input() set playHeadPos(value: number) {
    // Keep playhead in view while scrolling
    this._playHeadPos = value;
    if (this.playing) {
      this.keepPlayheadInView();
    }
  }

  get width(): number {
    return this._width;
  }

  @Input() set width(value: number) {
    // Change selection start/end pos to fit new width
    this.scrollbar.update();
    this.playHeadPos = (this.playHeadPos / this.width) * value;
    this.selectionStartPos = (this.selectionStartPos / this.width) * value;
    this.selectionEndPos = (this.selectionEndPos / this.width) * value;
    this._width = value;
  }

  @Input() height: number = 75;
  @Input() playing: boolean = false;

  /* Parent component will handle anything to do with the actual player. */
  @Output() selection: EventEmitter<any> = new EventEmitter();
  @Output() changePlayHeadPos: EventEmitter<Event> = new EventEmitter();

  @ViewChild('timeline') timelineRef: ElementRef;

  private _width: number = screen.width;
  private _playHeadPos: number = 0;

  private selectionStartPos: number = 0;
  private selectionEndPos: number = 0;
  private isSelecting: boolean = false;
  private isHovering: boolean = false;
  private hoverPos: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Scrolls the timeline div if the playhead goes out of bounds.
   */
  private keepPlayheadInView() {
    let scrollPos = this.scrollbar.geometry().x;
    if (this.playHeadPos > scrollPos + screen.width || 
        this.playHeadPos < scrollPos) {
      this.scrollbar.scrollToX(this.playHeadPos);
    }
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
    this.selection.emit({selectionStartPos: this.selectionStartPos, 
      selectionEndPos: this.selectionEndPos});
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

  /**
   * Executes on mouse enter.
   * @param event mouse event data
   */
  handleEnter(event) {
    this.isHovering = true;
  }

  /**
   * Executes on mouse move.
   * @param event mouse event data
   */
  handleMove(event) {
    if (this.isHovering) this.hoverPos = event.layerX;
  }

  /**
   * Executes on mouse leave.
   * @param event mouse event data
   */
  handleLeave(event) {
    this.isHovering = false;
  }
}
