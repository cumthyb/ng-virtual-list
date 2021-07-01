import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'virtual-list',
  templateUrl: './virtual-list.component.html',
  styleUrls: ['./virtual-list.component.scss']
})
export class VirtualListComponent implements OnInit {
  @Input() listData = []
  @Input() itemSize = 20;
  @Input() screenHeight = 400;

  //可视区域高度
  // public screenHeight = 0;
  //偏移量
  public startOffset = 0;
  //起始索引
  public start = 0;
  //结束索引
  public end = null;

  //列表总高度
  public get listHeight() {
    return this.listData.length * this.itemSize;
  }

  //可显示的列表项数
  public get visibleCount() {
    return Math.ceil(this.screenHeight / this.itemSize)
  }

  //偏移量对应的style
  public get getTransform() {
    return `translate3d(0,${this.startOffset}px,0)`;
  }

  //获取真实显示列表数据
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
    //当前滚动位置
    let scrollTop = this.list.nativeElement.scrollTop;
    //此时的开始索引
    this.start = Math.floor(scrollTop / this.itemSize);
    //此时的结束索引
    this.end = this.start + this.visibleCount;
    //此时的偏移量
    this.startOffset = scrollTop - (scrollTop % this.itemSize);
  }

}
