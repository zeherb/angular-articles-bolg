import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { article } from 'src/app/models/article';
import { user } from 'src/app/models/user';
import { ArticlesService } from 'src/app/services/articles.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  wrongFile = false;
  articleForm: FormGroup;
  articlesList: article[];
  connectedUser: user;
  supportedImageType: '^w+.(png|jpg|jpeg)$';
  postedArticle = false;
  selectedFile: ImageSnippet;

  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title: new FormControl('', Validators.required),
      pic: new FormControl(''),
      content: new FormControl('', Validators.required),
    });
    this.connectedUser = JSON.parse(localStorage.getItem('connected')!);
  }
  post() {
    if (this.articleForm.status == 'VALID' && this.wrongFile == false) {
      const article: article = {
        title: this.articleForm.controls.title.value,
        pic: JSON.parse(localStorage.getItem('image')!),
        content: this.articleForm.controls.content.value,
        owner: this.connectedUser,
        id: Number,
      };
      this.articlesService.addarticle(article).subscribe(
        (res) => {},
        (err) => {},
        () => {
          this.articleForm.reset();
          this.articleForm.controls.title.setErrors(null);
          this.articleForm.controls.pic.setErrors(null);
          this.articleForm.controls.content.setErrors(null);

          localStorage.removeItem('image');
          setTimeout(
            () => {
              this.postedArticle = false;
              this.router.navigate(['/myArticles']);
            },
            4000,
            (this.postedArticle = true)
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
