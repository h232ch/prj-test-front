import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Board} from "../board-models/board.model";
import {Observable, Subject,} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../auth/user.model";
import {takeUntil} from "rxjs/operators";
import {BoardApiService} from "../board-api-service";

@Component({
    selector: 'app-board-edit',
    templateUrl: './board-edit.component.html',
    styleUrls: ['./board-edit.component.css']
})
export class BoardEditComponent implements OnInit, OnDestroy {
    boardForm: FormGroup;
    id: number;
    editMode = false;
    user: User;
    error: string;

    private currentPage: number;
    private destroySub = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private boardApiService: BoardApiService,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.boardApiService.error
            .pipe(takeUntil(this.destroySub))
            .subscribe(res => {
                this.error = this.boardApiService.formatError(res);
            });

        this.route.params.pipe(
            takeUntil(this.destroySub)
        ).subscribe(
            (params: Params) => {
                this.id = +params['id']; // Convert id to number
                this.editMode = params['id'] !== undefined;
                this.initForm();
            }
        );

        // to patch values when editing forms
        this.boardApiService.boardChanged.subscribe(res => {
            this.boardForm.patchValue({
                boardData: {
                    title: res.title,
                    content: res.content
                }
            });
        })
    }

    onSubmit() {
        this.authService.user.subscribe(res => {
            const boardData = this.boardForm.value.boardData;
            const board = this.onChangeBoard(boardData);

            return this.editMode
                ? this.boardApiService.update(this.id, board, this.currentPage)
                : this.boardApiService.create(board);
        })
    }

    onChangeBoard(boardData: Board): Board {
        if (this.editMode) {
            return {
                id: undefined,
                user: undefined,
                email: undefined,
                title: boardData.title,
                content: boardData.content,
                published: boardData.published,
                comments: undefined,
            }
        }
        return {
            id: undefined,
            user: undefined,
            email: undefined,
            title: boardData.title,
            content: boardData.content,
            published: new Date(),
            comments: undefined,
        }
    }

    onCancel() {
        this.router.navigate(['../'],
            {relativeTo: this.route});
    }

    private initForm() {
        this.boardForm = new FormGroup({
            boardData: new FormGroup({
                'title': new FormControl<string>('',
                    [Validators.required]),
                'content': new FormControl<string>('',
                    [Validators.required]),
            }),
        });

        if (this.editMode) {
            this.boardApiService.getById(this.id);
        }
    }

    ngOnDestroy(): void {
        this.destroySub.next();
        this.destroySub.complete();
    }

    onHandleError() {
        this.error = null;
    }
}
