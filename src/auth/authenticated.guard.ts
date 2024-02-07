import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {request} from "express";
@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context:ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        return request.isAuthenticated();
    }
}