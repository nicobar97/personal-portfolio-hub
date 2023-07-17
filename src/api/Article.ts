import { EitherAsync, Right } from 'purify-ts';

import { mapFetchFactory } from '../service/MappedFetch';
import { Article, ArticlePrompt, SimpleArticle } from '../model/Article';
import { FetchAuthMapError } from '../model/errors';

export type GetArticles = () => EitherAsync<FetchAuthMapError, SimpleArticle[]>;
export type GetArticle = (id: string) => EitherAsync<FetchAuthMapError, Article>;
export type GenerateArticle = (prompt: ArticlePrompt) => EitherAsync<FetchAuthMapError, Article>;
export const getArticles: GetArticles = () =>
  mapFetchFactory().fetch<SimpleArticle[], SimpleArticle[]>(
    `https://nicobar-portfolio-backend-2a94882f04a5.herokuapp.com/api/articles/simples`,
    { method: 'GET' },
    (articles) => Right(mapArticles(articles)),
  );

export const getArticle: GetArticle = (id: string) =>
  mapFetchFactory().fetch<Article, Article>(
    `https://nicobar-portfolio-backend-2a94882f04a5.herokuapp.com/api/articles/get/${id}`,
    { method: 'GET' },
    (articles) => Right(mapArticle(articles)),
  );

export const generateArticle: GenerateArticle = (promp: ArticlePrompt) =>
  mapFetchFactory().fetch<Article, Article>(
    `https://nicobar-portfolio-backend-2a94882f04a5.herokuapp.com/api/articles/generate`,
    { method: 'POST', body: JSON.stringify(promp) },
    (articles) => Right(mapArticle(articles)),
  );

const mapArticles = (articles: SimpleArticle[]) =>
  articles.map((article) => mapSimpleArticle(article));

const mapArticle = (article: Article) => ({ ...article, date: new Date(article.date) });
const mapSimpleArticle = (article: SimpleArticle) => ({ ...article, date: new Date(article.date) });
