import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { TokenService } from "src/app/@core/token/token.service";
import { environment } from "src/environments/environment";
import { Auth } from "./auth.model";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private readonly APIurl = `${environment.APIurl}/auth`;
  private decodedToken: any;
  private _password$ = new BehaviorSubject<string>("");
  public password$ = this._password$.asObservable();
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();
  public clearTimeout: any;
  public _insertedID = new BehaviorSubject<string>("");
  public insertedID = this._insertedID.asObservable();
  public _loggedInUsername$ = new BehaviorSubject<string>("");
  public loggedInUsername$ = this._loggedInUsername$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    const token = localStorage.getItem("token");
    this._isLoggedIn$.next(!!token);
  }

  public login(auth: Auth): any {
    return this.httpClient.post(`${this.APIurl}/login`,
      {
        username: auth.getUsername(),
        password: auth.getPassword(),
      },
      { responseType: "text" }
    ).pipe(tap((token: any) => {
        let tokenString = token.replaceAll('"','');
        this.decodedToken = this.tokenService.decodeToken(tokenString);
        if (this.decodedToken) {
          this._isLoggedIn$.next(true);
          this._loggedInUsername$.next(this.decodedToken.username);
          this.tokenService.setToken(tokenString);
        } else {
          console.log("Invalid token");
        }
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  public registerRegular(request: any, role: string): Observable<any> {
    return this.httpClient.post(`${this.APIurl}/signup-${role}`,
      {
        username: request.username,
        password: request.password,
        email: request.email,
        firstname: request.firstname,
        lastname: request.lastname,
        city: request.city,
        gender: request.gender,
        age: request.age
      },
      { responseType: "text" }
    ).pipe(tap((response: any) => {
        this._insertedID.next(response);
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  public registerBusiness(request: any, role: string): Observable<any> {
    return this.httpClient.post(`${this.APIurl}/signup-${role}`,
      {
        username: request.username,
        password: request.password,
        company: request.company,
        website: request.website,
        email: request.email,
      },
      { responseType: "text" }
    ).pipe(tap((response: any) => {
        this._insertedID.next(response);
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  public autoLogout(expiration: number): void {
    this.clearTimeout = setTimeout(() => {
      this.logout();
      window.location.reload();
      this.router.navigate(['feed']);
    }, expiration);
  }

  public isLoggedIn(): any {
    return !!localStorage.getItem('token');
  }

  public logout(): void {
    this.tokenService.removeToken();
    localStorage.removeItem('expiration');
    this._isLoggedIn$.next(false);
    this._loggedInUsername$.next('');
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
  }
  
  public setLoggedInPassword(password: string): void {
    this._password$.next(password);
  }

  public getLoggedInUsername() {
    return this.decodedToken;
  }
}
