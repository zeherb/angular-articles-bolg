import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ComparePasswordDirective } from './directive/compare-directive/compare-password.directive';
import { NgFileValidatorLibModule } from 'angular-file-validator';
import { HttpClientModule } from '@angular/common/http';
import { UpdateDialogComponent } from './dialogs/update-dialog/update-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPipe } from './pipe/filter/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MyArticlesComponent,
    AddArticleComponent,
    NotFoundComponent,
    ComparePasswordDirective,
    UpdateDialogComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgFileValidatorLibModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
