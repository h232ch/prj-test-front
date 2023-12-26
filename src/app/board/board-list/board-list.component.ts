import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board} from "../board.model";
import {BoardService} from "../board.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  boards: Board[];
  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subscription = this.boardService.boardsChanged.subscribe(
      (boards: Board[]) => {
        this.boards = boards;
      }
    )
    this.boards = this.boardService.getBoards();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewBoard() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
