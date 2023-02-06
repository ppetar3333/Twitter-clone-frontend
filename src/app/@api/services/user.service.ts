import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly APIurlProfile = `${environment.APIurl}/profile`;
  private readonly APIurlGraph = `${environment.APIurl}/socialGraph`;
  private readonly APIurlAuth = `${environment.APIurl}/auth`;

  constructor(private httpClient: HttpClient) {}

  public getRegularUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlProfile}/get-regular-users`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getBusinessUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlProfile}/get-business-users`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getRegularUserByID(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlProfile}/regular-user/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getBusinessUserByID(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlProfile}/business-user/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getUsersByIds(ids: Array<string>): Observable<any> {
    return this.httpClient.post(`${this.APIurlProfile}/get-users-by-ids`, ids ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getRegularUserByUsername(username: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlProfile}/regular-user-username/${username}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }
  
  public getBusinessUserByUsername(username: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlProfile}/business-user-username/${username}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public updateProfileVisibility(data: any, id: string): Observable<any> {
    return this.httpClient.put(`${this.APIurlProfile}/update-profile-status/${id}`, { data }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public changePassword(data: any, username: any): Observable<any> {
    return this.httpClient.put(`${this.APIurlAuth}/change-password/${username}`, 
      { 
        "currentPassword": data.current_password,
        "newPassword": data.new_password
      }
      ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public recoveryPassword(data: any): Observable<any> {
    return this.httpClient.post(`${this.APIurlAuth}/recovery-password`, 
      { 
        "email": data.email,
        "code": data.code,
        "newPassword": data.new_password
      }
      ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public sendCodeForRecovery(email: string): Observable<any> {
    return this.httpClient.post(`${this.APIurlAuth}/code-recovery`, 
      { 
        "email": email
      }
      ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public followUser(loggedInUserId: string, userProfileId: string): Observable<any> {
    return this.httpClient.post(`${this.APIurlGraph}/follow`, 
      { 
        "requestedBy": loggedInUserId,
        "requestedTo" : userProfileId
      }
      ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public verifyRegistration(data: any): Observable<any> {
    return this.httpClient.post(`${this.APIurlAuth}/validate-code`, 
      { 
        "username": data.username,
        "password": data.password,
        "code": data.code,
      }
      ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public followRequest(loggedInUserId: string, userProfileId: string): Observable<any> {
    return this.httpClient.post(`${this.APIurlGraph}/followRequest`,
    { 
      "requestedBy": loggedInUserId,
      "requestedTo" : userProfileId
    }
    ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public acceptRequest(loggedInUserId: string, userProfileId: string): Observable<any> {
    return this.httpClient.post(`${this.APIurlGraph}/acceptRequest`, 
    {
      "user": loggedInUserId,
      "onRequestFromUser" : userProfileId
    }
    ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public declineRequest(loggedInUserId: string, userProfileId: string): Observable<any> {
    return this.httpClient.post(`${this.APIurlGraph}/declineRequest`, 
    {  
      "user": loggedInUserId,
      "onRequestFromUser" : userProfileId
    }
    ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public unfollowUser(loggedInUserId: string, userProfileId: string): Observable<any> {
    return this.httpClient.post(`${this.APIurlGraph}/unfollow`,
    { 
      "user": loggedInUserId,
      "wantToUnfollow" : userProfileId
    }
    ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getRecommendationsForUser(userid: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlGraph}/getRecommendations/${userid}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getAllFollowing(userid: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlGraph}/getFollowing/${userid}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getAllFollowers(userid: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlGraph}/getFollowers/${userid}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getFollowRequests(userid: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlGraph}/getFollowRequests/${userid}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public checkIsFollowing(requestedBy: any, requestedTo: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurlGraph}/isFollowing/${requestedBy}/${requestedTo}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }
}
