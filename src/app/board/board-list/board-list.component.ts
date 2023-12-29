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
  boardsCurrentPageSub: Subscription;

  boards: Board[];

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

    this.boardsSub = this.boardService.boardsChanged
      .subscribe(
      (boards: Board[]) => {
        this.boards = boards;
      }
    );

    this.boards = this.boardService.getBoards();
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

  ngOnDestroy(): void {
    this.boardsSub.unsubscribe();
  }

}
