import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private readonly APIurl = `${environment.APIurl}/tweets`;

  constructor(private httpClient: HttpClient) {}

  public getTweets(): Observable<any> {
    return this.httpClient.get<any>(this.APIurl).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getTweetsForFeedPageByUser(userid: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurl}/get-all/${userid}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getTweetsForUsersPage(userProfileId: string, loggedInUserId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurl}/get-all-of-user/${userProfileId}/${loggedInUserId}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getTweetById(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.APIurl}/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public likeUnlikeTweet(tweetid: string, userid: string, data?: string): Observable<any>  {
    return this.httpClient.put(`${this.APIurl}/like-unlike-tweet/${tweetid}/${userid}`, { data }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );;
  }

  public createTweet(tweet: any): Observable<any> {
    return this.httpClient.post(`${this.APIurl}/create`, 
      { 
        "text": tweet.text,
        "likes": tweet.likes,
        "tweet": tweet.tweet,
        "user": tweet.user.id
      }
      ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public retweetTweetById(tweetID: any, retweet: any): Observable<any> {
    return this.httpClient.post(`${this.APIurl}/${tweetID}/retweet`, { retweet }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }
}
