import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {BoardService} from "../../board/board.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  constructor(
    private boardService: BoardService,
  ) {
  }
  ngOnInit(): void {
    this.boardService.startPage
      .pipe(take(1))
      .subscribe(res => {
        this.startPage = res;
      })
    this.boardService.pageSize
      .pipe(take(1))
      .subscribe(res => {
        if (this.pageSize >= this.totalPages) {
          this.pageSize = this.totalPages;
        } else {
          this.pageSize = res;
        }
      })
  }

  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Input() totalItems: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Input() pageSize: number;
  @Input() startPage: number;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }

  get pageNumbers(): number[] {
    // ToDo : on the pagination next page, It will be changed when I create someting
    if (this.totalPages <= 4) {
      this.pageSize = this.totalPages;
    } 
    return Array.from({length: this.pageSize}, (_, index) => index + this.startPage);
  }

  previous() {
    if (this.startPage == 1) {
      return
    }
    this.pageSize = 4;
    this.startPage = this.startPage - this.pageSize;
    this.changePage(this.startPage + 3);

    console.log('total page : ' + this.totalPages)
    console.log('start page : ' + this.startPage)
    console.log('page size : ' + this.pageSize)
  }

  next() {
    console.log('total item : ' + this.totalItems)
    console.log((this.startPage + (this.pageSize - 1)))
    if ((this.startPage + (this.pageSize - 1)) == this.totalPages) {
      return
    }

    this.pageSize = 4;
    this.startPage = this.startPage + this.pageSize;

    if ((this.startPage + 4) > this.totalPages) {
      this.pageSize = (this.totalPages + 1) - this.startPage;
    }

    this.changePage(this.startPage);

    console.log('total page : ' + this.totalPages);
    console.log('start page : ' + this.startPage)
    console.log('page size : ' + this.pageSize)
  }

}
