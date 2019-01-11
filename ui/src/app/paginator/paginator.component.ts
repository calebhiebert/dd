import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dd-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  @Input()
  public totalItems: number;

  @Input()
  public itemsPerPage: number = 5;

  @Input()
  public page: number = 0;

  @Output()
  public pageChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  public get numPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  public next() {
    if (this.canNext) {
      this.page++;
      this.pageChange.emit(this.page);
    }
  }

  public prev() {
    if (this.canPrev) {
      this.page--;
      this.pageChange.emit(this.page);
    }
  }

  public setPage(page: number) {
    this.page = page;
    this.pageChange.emit(this.page);
  }

  public get pageArr(): number[] {
    const pageArr: number[] = [];

    for (let i = 1; i < this.numPages + 1; i++) {
      pageArr.push(i);
    }

    return pageArr;
  }

  public get canNext() {
    return this.page < this.numPages;
  }

  public get canPrev() {
    return this.page > 1;
  }
}