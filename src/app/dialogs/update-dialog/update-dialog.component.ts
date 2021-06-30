import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { article } from 'src/app/models/article';
import { user } from 'src/app/models/user';
import { ArticlesService } from 'src/app/services/articles.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css'],
})
export class UpdateDialogComponent implements OnInit {
  wrongFile = false;
  UpdateForm: FormGroup;
  articlesToUpdate: article;
  articlesList: article[];
  connectedUser: user;
  thisUsersArticles: article[];
  supportedImageType: '^w+.(png|jpg|jpeg)$';
  updatedArticle = false;
  selectedFile: ImageSnippet;
  updatedPost: article;

  constructor(
    private articlesService: ArticlesService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.articlesToUpdate = data;
  }

  ngOnInit(): void {
    this.UpdateForm = new FormGroup({
      title: new FormControl('', Validators.required),
      pic: new FormControl(''),
      content: new FormControl('', Validators.required),
    });
    this.UpdateForm.controls.title.setValue(this.articlesToUpdate.title);
    this.UpdateForm.controls.content.setValue(this.articlesToUpdate.content);
    this.connectedUser = JSON.parse(localStorage.getItem('connected')!);
  }
  updateArticle() {
    const id = JSON.parse(localStorage.getItem('id')!);

    console.log(this.UpdateForm.value.pic);

    if (this.UpdateForm.value.pic) {
      this.updatedPost = {
        title: this.UpdateForm.controls.title.value,
        pic: JSON.parse(localStorage.getItem('image')!),
        content: this.UpdateForm.controls.content.value,
        owner: this.connectedUser,
        id: this.articlesToUpdate.id,
      };
      localStorage.removeItem('image');
    } else {
      this.updatedPost = {
        title: this.UpdateForm.controls.title.value,
        pic: this.articlesToUpdate.pic,
        content: this.UpdateForm.controls.content.value,
        owner: this.connectedUser,
        id: this.articlesToUpdate.id,
      };
    }
    if (this.UpdateForm.status == 'VALID' && this.wrongFile == false) {
      this.articlesService.updateArticle(id, this.updatedPost).subscribe(
        (res) => {},
        (err) => {},
        () => {
          this.articlesService.getArticles().subscribe(
            (res) => {
              this.articlesList = res;
            },
            (err) => {},
            () => {
              this.thisUsersArticles = this.articlesList.filter(
                (el) => el.owner.id == this.connectedUser.id
              );
              localStorage.removeItem('id');
              setTimeout(
                () => {
                  this.updatedArticle = false;
                },
                4000,
                (this.updatedArticle = true)
              );
            }
          );
        }
      );
    }
  }
  fileCheck(fileEvent: any) {
    const fileType = fileEvent.target.files[0].type;
    if (
      fileType !== 'image/jpg' &&
      fileType !== 'image/jpeg' &&
      fileType !== 'image/png'
    ) {
      this.wrongFile = true;
    } else {
      this.wrongFile = false;
      const file = fileEvent.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
        localStorage.setItem('image', JSON.stringify(this.selectedFile.src));
      });

      reader.readAsDataURL(file);
    }
  }
}
