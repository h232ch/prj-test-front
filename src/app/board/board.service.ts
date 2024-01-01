import {Injectable,} from '@angular/core';
import {Observable, Subject, throwError} from "rxjs";
import {BoardPaginationTemp, BoardTemp, Comment} from "./board-models/board.model";
import {DataStorageService} from "../shared/data-storage.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {BoardSearch} from "./board-models/board-search.model";


@Injectable()
export class BoardService extends DataStorageService<BoardTemp> {
    boardsChanged: Subject<BoardTemp[]> = new Subject<BoardTemp[]>();
    boardChanged: Subject<BoardTemp> = new Subject<BoardTemp>();
    boardPagination: Subject<BoardPaginationTemp> = new Subject<BoardPaginationTemp>();
    error = new Subject<{}>();


    // Pagination variables
    currentPage: Subject<number> = new Subject<number>();
    startPage: Subject<number> = new Subject<number>();
    pageSize: Subject<number> = new Subject<number>();

    private boards: BoardTemp[];
    private board: BoardTemp;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
    ) {
        super(httpClient, 'http://localhost:8000/api');
    }

    getAll(): Observable<BoardTemp[]> {
        return this.httpClient.get<BoardTemp[]>(`${this.apiUrl}/boards`);
    }

    getById(id: number): Observable<BoardTemp> {
        return this.httpClient.get<BoardTemp>(`${this.apiUrl}/boards/${id}`);
    }

    create(board: BoardTemp): Observable<BoardTemp> {
        return this.httpClient.post<BoardTemp>(`${this.apiUrl}/boards/`, board);
    }

    update(id: number, board: BoardTemp): Observable<BoardTemp> {
        return this.httpClient.put<BoardTemp>(`${this.apiUrl}/boards/${id}/`, board);
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/boards/${id}`);
    }

    getPaginationAll(id?: number): Observable<BoardPaginationTemp> {
        if (id) {
            return this.httpClient.get<BoardPaginationTemp>(`${this.apiUrl}/boards?page=${id}`);
        }
        return this.httpClient.get<BoardPaginationTemp>(`${this.apiUrl}/boards`);
    }

    search(searchData: BoardSearch): Observable<BoardPaginationTemp> {
        if (searchData.id) {
            return this.httpClient.post<BoardPaginationTemp>
            (`${this.apiUrl}/boards/search_data/?page=${searchData.id}`, searchData)
        } else {
            return this.httpClient.post<BoardPaginationTemp>
            (`${this.apiUrl}/boards/search_data/`, searchData);
        }
    }

    _getByCommentId(id: number): Observable<Comment> {
        return this.httpClient.get<Comment>(`${this.apiUrl}/comments/${id}`)
    }

    _updateComment(id: number, comment: Comment) {
        return this.httpClient.post<Comment>(`${this.apiUrl}/comments/${id}`, comment)
    }

    _createComment(comment: Comment) {
        return this.httpClient.post<Comment>(`${this.apiUrl}/comments/`, comment)
    }

    _deleteComment(id: number) {
        return this.httpClient.delete(`${this.apiUrl}/comments/${id}`);
    }


    //

    getBoards(id?: number) {
        let boardsObs: Observable<BoardPaginationTemp>;
        if (id) {
            boardsObs = this.getPaginationAll(id);
        } else {
            boardsObs = this.getPaginationAll();
        }
        boardsObs
            .pipe((catchError(this.handlerError)))
            .subscribe((res: BoardPaginationTemp) => {
                    this.boardPagination.next(res);
                    this.boards = res.results as unknown as BoardTemp[]; // Cast to Board[]
                    this.boardsChanged.next(this.boards.slice());
                }
            );
    }

    getSearchBoards(event: BoardSearch) {
        this.search(event).subscribe(res => {
            this.boardPagination.next(res);
            this.boards = res.results as unknown as BoardTemp[];
            this.boardsChanged.next(this.boards.slice());
        });
    }

    updateBoard(id: number, board: BoardTemp, page: number) {
        this.update(id, board)
            .subscribe(res => {
                    this.getBoards();
                    this.board = res;
                    this.boardChanged.next(this.board);
                    this.initPagination();
                    this.router.navigate(['/boards/' + res.id]);
                }, errorMessage => {
                    this.error.next(errorMessage.error.title);
                }
            )
    }

    createBoard(board: BoardTemp) {
        this.create(board)
            .subscribe(res => {
                    this.getBoards();
                    this.board = res;

                    this.boardChanged.next(res);
                    this.currentPage.next(1);
                    this.startPage.next(1);

                    this.getBoards();
                    this.router.navigate(['/boards/' + res.id])
                }, errorMessage => {
                    this.error.next(errorMessage.error);
                }
            )
    }

    getBoard(id: number) {
        this.getById(id).subscribe(res => {
            this.board = res;
            this.boardChanged.next(this.board);
        })
    }

    deleteBoard(id: number) {
        this.delete(id).subscribe(res => {
            this.getBoards();

            this.startPage.next(1);
            this.router.navigate(['/boards']);
        })
    }

    updateComment(boardId: number, commentId: number, comment: Comment) {
        this._updateComment(commentId, comment).subscribe(res => {
            this.getBoard(boardId);
        })
    }

    createComment(boardId: number, comment: Comment) {
        this._createComment(comment).subscribe(res => {
            this.getBoard(boardId);
        })
    }

    deleteComment(commentId: number, boardId: number) {
        this._deleteComment(commentId).subscribe(res => {
            this.getBoard(boardId);
        })
    }

    initPagination() {
        this.currentPage.next(1);
        this.startPage.next(1);
        this.pageSize.next(4);
    }

    handlerError(errorRes: HttpErrorResponse) {
        let errorMessage = errorRes.error
        if (!errorRes) {
            return throwError(errorMessage);
        }
        return throwError(errorMessage);
    }

}
