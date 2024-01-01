import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board, BoardTemp} from "../board-models/board.model";
import {BoardService} from "../board.service";
import {Subject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardSearch} from "../board-models/board-search.model";
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit, OnDestroy {
    error: string;
    private errorSub: Subscription;
    private destroy$ = new Subject<void>();

    boards: BoardTemp[];
    searchData: BoardSearch;
    searchString: string;
    searchSw = false;

    // Pagination
    currentPage: number = 1;
    itemsPerPage: number = 5;
    totalItems: number;
    startPage: number = 1;
    pageSize: number = 5;
    boardsLength: number;

    constructor(
        private boardService: BoardService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.errorSub = this.authService.error
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                this.error = res;
            });

        this.boardService.boardsChanged
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (boards: BoardTemp[]) => {
                    this.boards = boards;
                    if (this.boards.length == 0) {
                        this.boardsLength = 0;
                    } else {
                        this.boardsLength = this.boards.length;
                    }
                }
            );
        // for search data
        this.boardService.boardPagination
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(res => {
                this.totalItems = res.count;
            })
        // Resolver will retrieve a board data
        // this.boards = this.boardService.getBoards();
    }

    onNewBoard() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    fetchData(): void {
        if (this.searchSw) {
            this.searchData.id = this.currentPage;
            this.boardService.getSearchBoards(this.searchData);
        } else {
            this.boardService.getBoards(this.currentPage);
        }
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.fetchData();
    }

    onSearch($event: BoardSearch) {
        this.searchData = $event;
        this.boardService.getSearchBoards(this.searchData);
        this.boardService.initPagination();
        this.searchSw = true;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onInitSearch() {
        this.searchSw = false;
        this.searchString = '';

        this.boardService.initPagination();
        this.currentPage = 1;
        this.fetchData();
    }

    onHandleError() {
        this.error = null;
    }
}
