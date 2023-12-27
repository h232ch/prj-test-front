import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Board, BoardPagination} from "../board.model";
import {BoardService} from "../board.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit, OnDestroy {
  boardsSub: Subscription;
  boardsPagSub: Subscription;
  boardsCurrentPageSub: Subscription;

  boards: Board[];
  boardsPagination: BoardPagination;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number;
  startPage: number = 1;
  pageSize: number = 4;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.boardsPagSub = this.boardService.boardPagination.subscribe((res: any) => {
        this.boardsPagination = res;
        this.totalItems = res['count'];
        this.boards = res['results'];
        console.log(res);
      }
    )
    this.boardsSub = this.boardService.boardsChanged.subscribe(
      (boards: Board[]) => {
        this.boards = boards;
      }
    );
    this.boardsCurrentPageSub = this.boardService.currentPage.subscribe(res => {
      this.currentPage = res;
    });
    this.boards = this.boardService.getBoards();
  }

  ngOnDestroy(): void {
    this.boardsPagSub.unsubscribe();
    this.boardsSub.unsubscribe();
  }

  onNewBoard() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  fetchData(): void {
    this.boardService.getBoardsPagination(this.currentPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

}
