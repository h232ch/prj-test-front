import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../board-models/board.model";
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
