import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {BoardApiService} from "../../board/board-api-service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy {
  // Pagination variables
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Input() totalItems: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Input() pageSize: number;
  @Input() startPage: number;

  // Pagination static variables
  private staticPageSize = 4;

  // Subscription values
  private startPageSub: Subscription;
  private boardsPagSub: Subscription;
  private boardsCurrentPageSub: Subscription;

  constructor(
              private boardApiService: BoardApiService) {}
  ngOnInit(): void {
    this.startPageSub = this.boardApiService.startPage
      .subscribe(res => {
        this.startPage = res;
      });

    this.boardsPagSub = this.boardApiService.boardPagination
      .subscribe((res: any) => {
        this.totalItems = res['count'];
      });

    this.boardsCurrentPageSub = this.boardApiService.currentPage
      .subscribe(res => {
      this.currentPage = res;
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
    if (this.totalPages <= this.staticPageSize) {
      this.pageSize = this.totalPages;

    } else if (this.startPage == 1) {
      this.pageSize = this.staticPageSize;
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
    this.changePage(this.startPage + (this.staticPageSize - 1));
  }

  next() {
    if ((this.startPage + (this.pageSize - 1)) == this.totalPages) {
      return
    }
    this.pageSize = 4;
    this.startPage = this.startPage + this.pageSize;

    if ((this.startPage + this.staticPageSize) > this.totalPages) {
      this.pageSize = (this.totalPages + 1) - this.startPage;
    }
    this.changePage(this.startPage);
  }

  ngOnDestroy(): void {
    this.startPageSub.unsubscribe();
    this.boardsCurrentPageSub.unsubscribe();
    this.boardsPagSub.unsubscribe();
  }

}
