import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {Board} from "./board.model";
import {DataStorageService} from "../shared/data-storage.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class BoardService extends DataStorageService<Board>{

  boardsChanged: Subject<Board[]> = new Subject<Board[]>();
  boardChanged: Subject<Board> = new Subject<Board>();
  private boards: Board[] = [];
  private board: Board;
  subscription: Subscription;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    super(httpClient, 'http://localhost:8000/api/boards');
  }

  getAll(): Observable<Board[]> {
    return this.httpClient.get<Board[]>(this.apiUrl);
  }

  getById(id: number): Observable<Board> {
    return this.httpClient.get<Board>(`${this.apiUrl}/${id}`);
  }

  create(board: Board): Observable<Board> {
    return this.httpClient.post<Board>(`${this.apiUrl}/`, board);
  }

  update(id: number, board: Board): Observable<Board> {
    return this.httpClient.put<Board>(`${this.apiUrl}/${id}/`, board);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBoards(): Board[] {
    this.getAll().subscribe(res => {
      this.boards = res;
      this.boardsChanged.next(this.boards.slice())
    })
    return this.boards;
  }

  updateBoard(id: number, board: Board) {
    this.update(id, board).subscribe(res => {
      this.getBoards();
      this.board = res;
      this.boardChanged.next(this.board);
      this.router.navigate(['/boards/' + res.id])
    })
  }

  createBoard(board: Board) {
    this.create(board).subscribe(res => {
      this.getBoards();
      this.board = res;
      this.boardChanged.next(res);
      this.router.navigate(['/boards/' + res.id])
    })
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
      this.router.navigate(['/boards']);
    })
  }

}


  // boardsChanged: Subject<Board[]> = new Subject<Board[]>();
  // private boards: Board[] = []

  // boards: Board[];
  // getBoards() {
    // this.httpClient.get<Board[]>(
    //   "http://localhost:8000/api/board",
    // ).subscribe(res => {
    //   this.boards = res;
    // })
  //   this.boardsChanged.next(this.boards.slice())
  // }

  // setBoards(boards: Board[]) {
  //   this.boards = boards;
  //   this.boardsChanged.next(boards.slice());
  // }
  //
  // addBoard(board: Board) {
  //   this.boards.push(board);
  //   this.boardsChanged.next(this.boards.slice());
  // }
  //
  // getBoard(id: number) {
  //   return this.boards[id];
  // }
  //
  // setBoard(board: Board) {
  //   this.boards.push(board);
  // //   Todo : http request
  // }
  //
  // deleteBoard(id: number) {
  //   this.boards.splice(id, 1);
  //   this.boardsChanged.next(this.boards);
  // }
  //
  // updateBoard(id: number, board: Board) {
  //   this.boards[id] = board;
  //   this.boardsChanged.next(this.boards.slice());
  // }
// }
