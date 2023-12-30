import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Board} from "../board.model";
import {BoardService} from "../board.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit, OnDestroy {
  board: Board;
  id: number;
  boardSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

    this.boardSub = this.boardService.boardChanged.subscribe(res => {
        this.board = res;
      }
    )

    // resolver will retrieve the detail of board
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = params['id'];
    //     this.boardService.getBoard(this.id);
    //   }
    // )
  }

  onEditBoard() {
    this.router.navigate(['edit'],
      {
        relativeTo: this.route,
      });
  }

  onDeleteBoard() {
    this.boardService.deleteBoard(this.id);
  }

  ngOnDestroy(): void {
    this.boardSub.unsubscribe();
  }
}
