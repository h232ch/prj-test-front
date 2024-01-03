import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board, Comment} from "../../board-models/board.model";
import {AuthService} from "../../../auth/auth.service";
import {User} from "../../../auth/user.model";

@Component({
    selector: 'app-board-child-comment',
    templateUrl: './board-child-comment.component.html',
    styleUrls: ['./board-child-comment.component.css']
})
export class BoardChildCommentComponent implements OnInit {
    @Input() child_comments: Comment['child_comments'];
    @Input() user: User;

    @Output() onEditChildComment = new EventEmitter<number>();
    @Output() onDeleteChildComment = new EventEmitter<number>();
    @Output() onNewChildComment = new EventEmitter<boolean>();

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {

    }

    onEditComment(id: number) {
        this.onEditChildComment.emit(id);
    }

    onDeleteComment(id: number) {
        this.onDeleteChildComment.emit(id);
    }
}
