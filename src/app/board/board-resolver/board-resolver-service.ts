import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {BoardService} from "../board.service";

@Injectable({
  providedIn: 'root',
})
export class BoardResolverService implements Resolve<any> {
  constructor(private boardService: BoardService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // Fetch data using a service, for example
    // console.log(route.params.id);
    return this.boardService.getBoard(route.params.id);
  }
}
