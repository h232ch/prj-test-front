import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor/auth-interceptor.service";
// import {BoardService} from "./board/board.service";
import {AuthService} from "./auth/auth.service";
import {BoardApiService} from "./board/board-api-service";
import {CommentApiService} from "./board/board-comment/comment-api-service";

@NgModule({
    providers: [
        // BoardService,
        BoardApiService,
        CommentApiService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
    ],
})
export class CoreModule {

}
