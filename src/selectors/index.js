import {createSelector} from 'reselect';
import {mapToArr} from '../helpers';
// Пример мемоизации (запоминание предыдущих данных)
const filtersGetter = state => state.filters;
const articlesGetter = state => state.articles.entities;
const commentsGetter = state => state.comments;
const idGetter = (state, props) => props.id;

// Оптимизация. Если что-то измениться, будет сравнивать articles и filters с
// прошлого раза и если ничего не поменялось, то не будет вызывать
// эту функцию повторно. Только, если что-то поменялось
// https://github.com/reactjs/reselect
export const filteredArticlesSelector = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
  const {selected, dateRange: {from, to}} = filters;

  return mapToArr(articles).filter(article => {
    const published = Date.parse(article.date);
    return (!selected.length || selected.includes(article.id)) &&
        (!from || !to || (published > from && published < to));
  });
});

export function filteredArticles({filters, articles}) {
  const {selected, dateRange: {from, to}} = filters;

  return articles.filter(article => {
    const published = Date.parse(article.date);
    return (!selected.length || selected.includes(article.id)) &&
        (!from || !to || (published > from && published < to));
  });
}

export const commentSelectorFactory = () => createSelector(commentsGetter, idGetter, (comments, id) => {
  console.log('getting comment');
  // Теперь весь поиск происходит в comments.js, после сортировки
  // мы просто обращаемся к конкретному ключу обьекта, что ускоряет поиск
  return comments[id];
});
