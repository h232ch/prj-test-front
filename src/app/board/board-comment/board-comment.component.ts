import {Component, Input, OnDestroy, OnInit, } from '@angular/core';
import {Board, Comment} from "../board-models/board.model";
import {ActivatedRoute, Params} from "@angular/router";
import {User} from "../../auth/user.model";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";
import {CommentApiService} from "./comment-api-service";

@Component({
    selector: 'app-board-comment',
    templateUrl: './board-comment.component.html',
    styleUrls: ['./board-comment.component.css']
})
export class BoardCommentComponent implements OnInit, OnDestroy {

    // Comment variables
    @Input() comments: Comment[];

    commentEditMode = false;
    childCommentMode: boolean;
    parentCommentId: number;

    commentId: number;
    boardId: number;

    // User
    @Input() user: User;

    constructor(
        private commentApiService: CommentApiService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.route.params.pipe()
            .subscribe((params: Params) => {
                this.boardId = +params['id'];
            });
    }


    // Comments
    onEditComment(id?: number) {
        if (id) {
            this.commentId = id;
        }
        this.commentEditMode = true;
    }

    onDeleteComment(commentId: number, boardId: number) {
        this.commentApiService.delete(commentId, boardId);
    }

    // Emit values (EditMode, CommentId)

    onEditModeChange(event: boolean) {
        this.commentEditMode = event;
    }

    onCommentIdChange() {
        this.commentId = undefined;
    }

    ngOnDestroy(): void {
    }

    // Child comments

    onNewChildComment(parentCommentId: number) {
        this.childCommentMode = true;
        this.commentEditMode = true;
        this.parentCommentId = parentCommentId;
    }

    onDeleteChildComment(commentId: number, boardId: number) {
        this.commentApiService.delete(commentId, boardId, true);
    }

    onEditChildComment(id?: number) {
        if (id) {
            this.commentId = id;
        }
        this.childCommentMode = true;
        this.commentEditMode = true;

    }

    onParentCommentIdChange(event: any) {
        this.parentCommentId = undefined;
    }

    onChildCommentChange() {
        this.childCommentMode = undefined;
    }
}
