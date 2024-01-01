import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BoardTemp} from "../board-models/board.model";
import {BoardService} from "../board.service";
import {ActivatedRoute, Params} from "@angular/router";
import {User} from "../../auth/user.model";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-board-comment',
  templateUrl: './board-comment.component.html',
  styleUrls: ['./board-comment.component.css']
})
export class BoardCommentComponent implements OnInit, OnDestroy {
  @Input() comments: BoardTemp['comments'];
  editSw = false;
  commentId: number;
  boardId: number;
  user: User;
  authSub: Subscription;
  constructor(
      private boardService: BoardService,
      private route: ActivatedRoute,
      private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe()
            .subscribe((params: Params) => {
                this.boardId = +params['id'];
            });
    this.authSub = this.authService.user.subscribe(res => {
      this.user = res;
    })
  }

  onEditComment(id?: number) {
    if (id) {
      this.commentId = id;
    }
    this.editSw = true;

  }

  onEditModeChange(event: boolean) {
    this.editSw = event;
  }

  onCommentIdChange() {
    this.commentId = undefined;
  }


  onDeleteComment(commentId: number, boardId: number) {
    this.boardService.deleteComment(commentId, boardId);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
