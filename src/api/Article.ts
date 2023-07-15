import { EitherAsync, Right } from 'purify-ts';

import { mapFetchFactory } from '../service/MappedFetch';
import { Article } from '../model/Article';
import { FetchAuthMapError } from '../model/errors';

export type GetArticles = () => EitherAsync<FetchAuthMapError, Article[]>;

export const getArticles: GetArticles = () =>
  mapFetchFactory().fetch<Article[], Article[]>(
    `https://nicobar-portfolio-backend-2a94882f04a5.herokuapp.com/api/article/get`,
    { method: 'GET' },
    (articles) => Right(mapArticles(articles)),
  );

const mapArticles = (articles: Article[]) =>
  articles.map((article: Article) => ({ ...article, date: new Date(article.date) }));
