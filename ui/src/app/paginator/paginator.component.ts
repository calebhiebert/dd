import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dd-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input()
  public totalItems: number;

  @Input()
  public itemsPerPage = 5;

  @Input()
  public page = 0;

  @Input()
  public autoHide = true;

  @Output()
  public pageChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

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
    const pageArr: number[] = [1];

    if (this.numPages > 4) {
      if (this.page > 2) {
        pageArr.push(-1);
      }

      for (
        let i = Math.max(2, this.page - 1);
        i < Math.min(this.page + 2, this.numPages);
        i++
      ) {
        pageArr.push(i);
      }

      if (this.page < this.numPages - 2) {
        pageArr.push(-1);
      }

      pageArr.push(this.numPages);
    } else if (this.numPages > 1) {
      for (let i = 2; i < this.numPages + 1; i++) {
        pageArr.push(i);
      }
    }

    return pageArr;
  }

  public get numPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  public get canNext() {
    return this.page < this.numPages;
  }

  public get canPrev() {
    return this.page > 1;
  }
}
