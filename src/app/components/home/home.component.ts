import { Component, OnInit } from '@angular/core';
import { article } from 'src/app/models/article';
import { user } from 'src/app/models/user';
import { ArticlesService } from 'src/app/services/articles.service';

export class TitleOnly {
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  articlesList: article[];
  search: TitleOnly;
  searchWord: string = '';
  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe(
      (res) => {
        this.articlesList = res;
      },
      (err) => {},
      () => {}
    );
  }
  searching(word: any) {
    this.searchWord = word;
    this.search = {
      title: this.searchWord,
    };
  }
}
