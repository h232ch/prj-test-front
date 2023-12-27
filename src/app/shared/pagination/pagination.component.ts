import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {BoardService} from "../../board/board.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Input() totalItems: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Input() pageSize: number;
  @Input() startPage: number;

  constructor(private boardService: BoardService,) {}

  ngOnInit(): void {
    this.boardService.startPage
      .subscribe(res => {
        this.startPage = res;
      });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }

  get pageNumbers(): number[] {
    if (this.totalPages <= 4) {
      this.pageSize = this.totalPages;

    } else if (this.startPage == 1) {
      this.pageSize = 4;
    }
    return Array.from({length: this.pageSize},
      (_, index) => index + this.startPage);
  }

  previous() {
    if (this.startPage == 1) {
      return
    }
    this.pageSize = 4;
    this.startPage = this.startPage - this.pageSize;
    this.changePage(this.startPage + 3);
  }

  next() {
    if ((this.startPage + (this.pageSize - 1)) == this.totalPages) {
      return
    }
    this.pageSize = 4;
    this.startPage = this.startPage + this.pageSize;

    if ((this.startPage + 4) > this.totalPages) {
      this.pageSize = (this.totalPages + 1) - this.startPage;
    }
    this.changePage(this.startPage);
  }

}
