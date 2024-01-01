import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Comment} from "../../board-models/board.model";
import {BoardService} from "../../board.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'app-board-comment-edit',
    templateUrl: './board-comment-edit.component.html',
    styleUrls: ['./board-comment-edit.component.css']
})
export class BoardCommentEditComponent implements OnInit {
    @Input() editMode = false;
    @Input() commentId: number;

    @Output() editModeOutput = new EventEmitter<boolean>();
    @Output() commentIdOutput = new EventEmitter<boolean>();

    commentObs: Observable<Comment>;
    boardId: number;
    commentForm: FormGroup;

    constructor(
        private boardService: BoardService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
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

        if (this.commentId) {
            this.boardService._getByCommentId(this.commentId)
                .subscribe(comment => {
                    this.commentForm.patchValue({
                        comment: comment.comment,
                    })
                });
        }
    }

    onSubmit() {
        const commentData = this.commentForm.value;
        const comment: Comment = this.onChangeComment(commentData);

        if (this.commentId) {
            this.boardService.updateComment(this.boardId, this.commentId, comment);
        } else {
            this.boardService.createComment(this.boardId, comment);
        }
        this.init();
    }

    onChangeComment(commentForm) {
        let comment: Comment;
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
        }
        return comment;

    }

    onCancel() {
        this.init();
    }

    init() {
        this.commentIdOutput.emit(undefined);
        this.commentForm.reset();
        this.editMode = false;
        this.editModeOutput.emit(this.editMode);
    }

}
