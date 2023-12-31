import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BoardService} from "../board.service";
import {Board} from "../board-models/board.model";
import {Observable, Subject} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../auth/user.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.css']
})
export class BoardEditComponent implements OnInit, OnDestroy {
  boardForm: FormGroup;
  boardObs: Observable<Board>;
  id: number;
  editMode = false;
  user: any;
  private currentPage: number;
  private destroySub = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroySub)
    ).subscribe(
      (params: Params) => {
        this.id = +params['id']; // Convert id to number
        this.editMode = params['id'] !== undefined;
        this.initForm();
      }
    );
  }

  onSubmit() {
    this.authService.user.subscribe(res => {
      const user = res;
      const boardData = this.boardForm.value.boardData;
      const board = this.onChangeBoard(boardData, user);

      return this.editMode
        ? this.boardService.updateBoard(this.id, board, this.currentPage)
        : this.boardService.createBoard(board);
    })
  }

  onChangeBoard(boardData, user: User): Board {
    if (this.editMode) {
      return {
        id: undefined, // Assuming the server will provide the ID
        user: undefined,
        email: undefined,
        title: boardData.title,
        content: boardData.content,
        published: boardData.published,
      }
    }
    return {
      id: undefined, // Assuming the server will provide the ID
      user: user.id,
      email: user.email,
      title: boardData.title,
      content: boardData.content,
      published: new Date(),
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
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
      this.boardObs = this.boardService.getById(this.id);
      this.boardObs.pipe(
        takeUntil(this.destroySub)
      ).subscribe(board => {
        this.boardForm.patchValue({
          boardData: {
            title: board.title,
            content: board.content
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
  }

}
