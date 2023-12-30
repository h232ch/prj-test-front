import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {BoardService} from "../board.service";

@Injectable({
  providedIn: 'root',
})
export class BoardsResolverService implements Resolve<any> {
  constructor(private boardService: BoardService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.boardService.getBoards();
  }
}
