import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[selection-box]',
  templateUrl: './selection-box.component.html',
  styleUrls: ['./selection-box.component.css']
})

/* Draws the selection rectangle while dealing with negative widths for the rectangle
   (i.e. when the selection is made from right to left). */
export class SelectionBoxComponent implements OnInit {
  @Input() selectionStartPos: number = 0;

  private boxStartPos: number = 0;
  private boxWidth: number = 0;
  
  constructor() { }

  ngOnInit() { }

  /**
   * Calculate the real position of the selection, based on if the
   * selection was made to the right or left.
   */
  @Input() set selectionEndPos(selectionPos: number) {
    // Selection dragged to left
    if (selectionPos < this.selectionStartPos) {
      this.boxStartPos = selectionPos;
      this.boxWidth = this.selectionStartPos - selectionPos;
    }

    // Selection dragged to right
    else {
      this.boxStartPos = this.selectionStartPos;
      this.boxWidth = selectionPos - this.selectionStartPos;
    }
  }

}
