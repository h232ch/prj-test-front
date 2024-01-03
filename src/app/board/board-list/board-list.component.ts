import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board} from "../board-models/board.model";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardSearch} from "../board-models/board-search.model";
import {takeUntil} from "rxjs/operators";
import {BoardApiService} from "../board-api-service";

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    boards: Board[];
    searchData: BoardSearch;
    searchString: string;
    searchSw = false;

    // Pagination
    currentPage: number = 1;
    itemsPerPage: number = 5;
    totalItems: number;
    startPage: number = 1;
    pageSize: number = 4;
    boardsLength: number;

    constructor(
        private boardApiService: BoardApiService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.boardApiService.boardsChanged
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (boards: Board[]) => {
                    this.boards = boards;
                    if (this.boards.length == 0) {
                        this.boardsLength = 0;
                    } else {
                        this.boardsLength = this.boards.length;
                    }
                }
            );
        // for search data
        this.boardApiService.boardPagination
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(res => {
                this.totalItems = res.count;
            })
    }

    onNewBoard() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    fetchData(): void {
        if (this.searchSw) {
            this.searchData.id = this.currentPage;
            this.boardApiService.search(this.searchData);
        } else {
            this.boardApiService.getAll(this.currentPage)
        }
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.fetchData();
    }

    onSearch($event: BoardSearch) {
        this.searchData = $event;
        this.boardApiService.search(this.searchData);
        this.boardApiService.initPagination();
        this.searchSw = true;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onInitSearch() {
        this.searchSw = false;
        this.searchString = '';

        this.boardApiService.initPagination();
        this.currentPage = 1;
        this.fetchData();
    }
}
