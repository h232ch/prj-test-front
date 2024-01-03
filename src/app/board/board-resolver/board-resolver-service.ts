import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {BoardApiService} from "../board-api-service";

@Injectable({
  providedIn: 'root',
})
export class BoardResolverService implements Resolve<any> {
  constructor(private boardApiService: BoardApiService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // Fetch data using a service, for example
    // console.log(route.params.id);
    // return this.boardService.getBoard(route.params.id);
    return this.boardApiService.getById(route.params.id);
  }
}
