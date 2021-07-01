import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'virtual-list',
  templateUrl: './virtual-list.component.html',
  styleUrls: ['./virtual-list.component.scss']
})
export class VirtualListComponent implements OnInit {
  @Input() listData = []
  @Input() cols = [];
  @Input() itemSize = 40;
  @Input() visibleHeight = 400;


  public startOffset = 0;
  public start = 0;
  public end = null;

  public get listHeight() {
    return this.listData.length * this.itemSize;
  }

  public get visibleCount() {
    return Math.ceil(this.visibleHeight / this.itemSize)
  }

  public get getTransform() {
    return `translate3d(0,${this.startOffset}px,0)`;
  }

  public get visibleData() {
    return this.listData.slice(this.start, Math.min(this.end, this.listData.length));
  }

  @ViewChild('list') list: ElementRef;
  @ViewChildren('items') targetTable: QueryList<ElementRef>;

  constructor() { }

  ngOnInit() {
    this.start = 0;
    this.end = this.start + this.visibleCount;
  }

  onScroll(event?) {
    let scrollTop = this.list.nativeElement.scrollTop;
    this.start = Math.floor(scrollTop / this.itemSize);
    this.end = this.start + this.visibleCount;
    this.startOffset = scrollTop - (scrollTop % this.itemSize);
  }

}
