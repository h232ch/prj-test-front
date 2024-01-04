import {Injectable} from "@angular/core";
import {ApiClientService} from "../shared/api-client-service";
import {Board, BoardPagination} from "./board-models/board.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {BoardSearch} from "./board-models/board-search.model";


@Injectable()
export class BoardApiService extends ApiClientService<Board> {

    // Board variables
    boardsChanged: Subject<Board[]> = new Subject<Board[]>();
    boardChanged: Subject<Board> = new Subject<Board>();
    boardPagination: Subject<BoardPagination> = new Subject<BoardPagination>();

    private boards: Board[];
    private board: Board;

    // Error variable
    error = new Subject<[]>();

    // Pagination variables
    currentPage: Subject<number> = new Subject<number>();
    startPage: Subject<number> = new Subject<number>();
    pageSize: Subject<number> = new Subject<number>();

    constructor(
        private httpClient: HttpClient,
        private router: Router,
    ) {
        super(httpClient, 'http://127.0.0.1:8000/api/boards/');
    }

    getAll(id?: number) {
        // let targetUrl: string;
        let targetUrl = this.apiUrl;
        if (id) {
            targetUrl = this.apiUrl + '?page=' + id;
        } else {
            targetUrl = this.apiUrl;
        }
        this.httpClient.get<BoardPagination>(`${targetUrl}`).subscribe(res => {
            this.boardPagination.next(res);
            this.boards = res.results as unknown as Board[];
            this.boardsChanged.next(this.boards);
        }, errorMessage => {
            this.error.next(errorMessage.error);
        });
    }


    create(item: Board) {
        this.httpClient.post<Board>(`${this.apiUrl}`, item).subscribe(res => {
            this.getAll();
            this.boardChanged.next(res);
            this.currentPage.next(1);
            this.startPage.next(1);
            this.router.navigate(['/boards/' + res.id])

        }, errorMessage => {
            this.error.next(errorMessage.error);
        })
    }

    update(id: number, item: Board, currentPage: number): void {
        this.httpClient.put<Board>(`${this.apiUrl}${id}/`, item).subscribe(res => {
            this.getAll();
            this.board = res;
            this.boardChanged.next(this.board);
            this.initPagination();
            this.router.navigate(['/boards/' + res.id]);
        }, errorMessage => {
            this.error.next(errorMessage.error);
        })
    }

    delete(id: number) {
        this.httpClient.delete<void>(`${this.apiUrl}${id}`).subscribe(res => {
            this.getAll();
            this.startPage.next(1);
            this.router.navigate(['/boards']);
        }, errorMessage => {
            this.error.next(errorMessage.error);
        });
    }

    getById(id: number) {
        this.httpClient.get<Board>(`${this.apiUrl}${id}`).subscribe(res => {
            this.boardChanged.next(res);
        }, errorMessage => {
            this.error.next(errorMessage.error);
        })
    }

    search(searchData: BoardSearch) {
        let targetUrl: string;
        if (searchData.id) {
            targetUrl = this.apiUrl + 'search_data/?page=' + searchData.id;
        } else {
            targetUrl = this.apiUrl + 'search_data/';
        }

        this.httpClient.post<BoardPagination>(`${targetUrl}`, searchData).subscribe(res => {
            this.boardPagination.next(res);
            this.boards = res.results as unknown as Board[];
            this.boardsChanged.next(this.boards.slice());

        }, errorMessage => {
            this.error.next(errorMessage.error);
        });
    }

    initPagination() {
        this.currentPage.next(1);
        this.startPage.next(1);
        this.pageSize.next(4);
    }

    formatError(error: []): string {
        if (!error) return null;
        // console.log(Object.values(error))
        return Object.values(error).join(' & ');
    }


}
