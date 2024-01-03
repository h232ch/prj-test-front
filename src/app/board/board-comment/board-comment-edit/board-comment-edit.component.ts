import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Comment} from "../../board-models/board.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CommentApiService} from "../comment-api-service";

@Component({
    selector: 'app-board-comment-edit',
    templateUrl: './board-comment-edit.component.html',
    styleUrls: ['./board-comment-edit.component.css']
})
export class BoardCommentEditComponent implements OnInit {
    @Input() commentEditMode = false;
    @Input() commentId: number;


    @Output() onEditModeChange = new EventEmitter<boolean>();
    @Output() onCommentIdChange = new EventEmitter<boolean>();

    @Input() childCommentMode = false;
    @Input() parentCommentId: number;
    @Output() onChildCommentModeChange = new EventEmitter<boolean>();
    @Output() onParentCommentIdChange = new EventEmitter<boolean>();


    boardId: number;
    commentForm: FormGroup;

    constructor(
        private commentApiService: CommentApiService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.commentApiService.comment.subscribe(res => {
            this.commentForm.patchValue({
                comment: res.comment,
            })
        })
        this.route.params.pipe()
            .subscribe((params: Params) => {
                this.boardId = +params['id'];
            })
        this.initForm();
    }

    private initForm() {
        this.commentForm = new FormGroup({
            'comment': new FormControl<string>('',
                [Validators.required]),
        });

        if (this.commentId && !this.parentCommentId) {
            if (this.childCommentMode) {
                this.commentApiService.getById(this.commentId, this.childCommentMode);
            } else {
                this.commentApiService.getById(this.commentId);
            }

        }

    }

    onSubmit() {
        const commentData = this.commentForm.value;
        const comment: Comment = this.onChangeComment(commentData);

        if (this.commentId && !this.parentCommentId) {
            this.commentApiService.update(this.commentId, comment, this.boardId, this.childCommentMode);
        } else if (this.parentCommentId) {
            this.commentApiService.create(comment, this.boardId, this.childCommentMode, this.parentCommentId);
        } else {
            this.commentApiService.create(comment, this.boardId);
        }
        this.init();
    }

    onChangeComment(commentForm: Comment) {
        let comment: any;
        if (this.parentCommentId) {
            comment = {
                id: undefined,
                email: undefined,
                board: this.boardId,
                comment: commentForm.comment,
                p_comment: this.parentCommentId,
                published: new Date(),
            };
            return comment;
        }

        if (this.commentId) {
            comment = {
                id: undefined,
                email: undefined,
                board: this.boardId,
                comment: commentForm.comment,
                published: new Date(),
            };
            return comment;
        }

        comment = {
            id: this.commentId,
            email: undefined,
            board: this.boardId,
            comment: commentForm.comment,
            published: new Date(),
        };
        return comment;

    }

    onCancel() {
        this.init();
    }

    init() {
        this.commentForm.reset();
        this.commentEditMode = false;
        this.onEditModeChange.emit(this.commentEditMode);

        this.onCommentIdChange.emit(undefined);
        this.onChildCommentModeChange.emit(undefined);
        this.onParentCommentIdChange.emit(undefined);
    }

}
