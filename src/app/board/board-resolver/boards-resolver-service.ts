import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {BoardApiService} from "../board-api-service";

@Injectable({
  providedIn: 'root',
})
export class BoardsResolverService implements Resolve<any> {
  constructor(
      // private boardService: BoardService,
      private boardApiService: BoardApiService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    // return this.boardService.getBoards();
    return this.boardApiService.getAll();
  }
}
