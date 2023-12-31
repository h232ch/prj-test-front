import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Board} from "../board-models/board.model";
import {BoardService} from "../board.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardSearch} from "../board-models/board-search.model";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit, OnDestroy {
  boardsSub: Subscription;
  boards: Board[];
  searchData: BoardSearch;
  searchString: string;
  searchSw = false;


  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number;
  startPage: number = 1;
  pageSize: number = 4;
  boardsLength: number;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.boardsSub = this.boardService.boardsChanged
      .subscribe(
      (boards: Board[]) => {
        this.boards = boards;
        if (this.boards.length == 0) {
          this.boardsLength = 0;
        } else {
          this.boardsLength = this.boards.length;
        }
      }
    );
    // for search data
    this.boardService.boardPagination.subscribe(res => {
      this.totalItems = res.count;
    })
    // Resolver will retrieve a board data
    // this.boards = this.boardService.getBoards();
  }

  onNewBoard() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  fetchData(): void {
    if (this.searchSw) {
      this.boardService.getBoardsSearchPagination(this.currentPage, this.searchData);
    } else {
      this.boardService.getBoardsPagination(this.currentPage);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

  onSearch($event: BoardSearch) {
    this.searchData = $event;
    this.boardService.searchBoards(this.searchData);
    this.searchSw = true;
  }
  ngOnDestroy(): void {
    this.boardsSub.unsubscribe();
  }

  onInitSearch() {
    this.boardService.initPagination();
    this.searchSw = false;
    this.searchString = '';
    this.fetchData();
  }
}
