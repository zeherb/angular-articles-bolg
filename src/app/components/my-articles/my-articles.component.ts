import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from 'src/app/dialogs/update-dialog/update-dialog.component';
import { article } from 'src/app/models/article';
import { user } from 'src/app/models/user';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css'],
})
export class MyArticlesComponent implements OnInit {
  articlesList: article[];
  thisUsersArticles: article[];
  articleToUpdate: article;
  user: user;
  constructor(
    private articlesService: ArticlesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe(
      (res) => {
        this.articlesList = res;
      },
      (err) => {},
      () => {
        this.user = JSON.parse(localStorage.getItem('connected')!);
        this.thisUsersArticles = this.articlesList.filter(
          (el) => el.owner.id == this.user.id
        );
      }
    );
  }
  deleteArticle(id: any) {
    this.articlesService.deleteArticle(id).subscribe(
      (res) => {},
      (err) => {},
      () => {
        this.articlesService.getArticles().subscribe(
          (res) => {
            this.articlesList = res;
          },
          (err) => {},
          () => {
            this.user = JSON.parse(localStorage.getItem('connected')!);
            this.thisUsersArticles = this.articlesList.filter(
              (el) => el.owner.id == this.user.id
            );
          }
        );
      }
    );
  }
  updateArticle(id: any) {
    this.articlesService.getArticle(id).subscribe(
      (res) => {
        this.articleToUpdate = res;
      },
      (err) => {},
      () => {
        localStorage.setItem('id', JSON.stringify(id));
        const dialogRef = this.dialog.open(UpdateDialogComponent, {
          data: {
            title: this.articleToUpdate.title,
            pic: this.articleToUpdate.pic,
            content: this.articleToUpdate.content,
          },
        });
        dialogRef.afterClosed().subscribe(
          (res) => {},
          (err) => {},
          () => {
            this.articlesService.getArticles().subscribe(
              (res) => {
                this.articlesList = res;
              },
              (err) => {},
              () => {
                this.user = JSON.parse(localStorage.getItem('connected')!);
                this.thisUsersArticles = this.articlesList.filter(
                  (el) => el.owner.id == this.user.id
                );
              }
            );
          }
        );
      }
    );
  }
}
