import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./login/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.authService.isAuthenticated()) {
            const authToken = this.authService.getAuthorizationToken();
            req = req.clone({
                headers: req.headers.set('Authorization', authToken)
            });
        }
        return next.handle(req);
    }

}
