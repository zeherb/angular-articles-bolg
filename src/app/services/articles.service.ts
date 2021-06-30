import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { article } from '../models/article';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}
  articlesUrl: string = '/api/articles';

  getArticles() {
    return this.http.get<article[]>(this.articlesUrl);
  }
  addarticle(article: article): Observable<article> {
    return this.http.post<article>(this.articlesUrl, article);
  }
  deleteArticle(id: any): Observable<article> {
    return this.http.delete<article>(this.articlesUrl + '/' + id);
  }
  updateArticle(id: any, article: article): Observable<article> {
    return this.http.put<article>(this.articlesUrl + '/' + id, article);
  }
  getArticle(id: any): Observable<article> {
    return this.http.get<article>(this.articlesUrl + '/' + id);
  }
}
