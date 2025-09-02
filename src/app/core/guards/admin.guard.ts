// src/app/core/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

type MeResponse = {
  id: number;
  firstName?: string;
  lastName?: string;
  roles?: string[]; // e.g. ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]
};

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanMatch {
  private meUrl = 'http://localhost:4000/api/users/me';

  constructor(private http: HttpClient, private router: Router) {}

  private check(): Observable<boolean> {
    return this.http.get<MeResponse>(this.meUrl, { withCredentials: true }).pipe(
      map((me) => {
        const roles = (me?.roles || []).map(r => String(r).toUpperCase());
        const allowed =
          roles.includes('ROLE_ADMIN') ||
          roles.includes('ROLE_SUPER_ADMIN') ||
          roles.includes('ADMIN') ||
          roles.includes('SUPER_ADMIN');

        if (allowed) return true;

        this.router.navigate(['/login']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }

  canMatch(_route: Route, _segments: UrlSegment[]): Observable<boolean> {
    return this.check();
  }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    return this.check();
  }
}
