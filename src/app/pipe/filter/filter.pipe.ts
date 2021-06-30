import { Pipe, PipeTransform } from '@angular/core';
import { article } from 'src/app/models/article';

export class TitleOnly {
  title: string;
}
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(articles: article[], filter: TitleOnly): any {
    if (!articles || !filter) {
      return articles;
    }
    return articles.filter(
      (article) =>
        article.title.toUpperCase().indexOf(filter.title.toUpperCase()) !== -1
    );
  }
}
