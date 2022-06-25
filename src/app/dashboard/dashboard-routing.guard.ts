import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DashboardRoutingGuard implements CanActivate {

    response: Observable<boolean> = new Observable<boolean>()

    constructor(private _httpClient: HttpClient) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this._httpClient
            .get<any>('http://localhost:3000/api/docs/' + route.paramMap.get('uuid'))
            .pipe(
                map(response => response.status === 'success')
            );

    }

}
