import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Board} from "../board-models/board.model";
import {BoardService} from "../board.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../auth/user.model";

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit, OnDestroy {
  board: Board;
  user: User;
  id: number;
  boardSub: Subscription;
  userSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(res => {
      this.user = res;
    })

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
    this.id = +this.board.id;
    this.boardService.deleteBoard(this.id);
  }

  ngOnDestroy(): void {
    this.boardSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
