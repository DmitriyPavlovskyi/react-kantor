import {createSelector} from 'reselect';
// Пример мемоизации (запоминание предыдущих данных)
const filtersGetter = state => state.filters;
const articlesGetter = state => state.articles;

// Оптимизация. Если что-то измениться, будет сравнивать articles и filters с
// прошлого раза и если ничего не поменялось, то не будет вызывать
// эту функцию повторно. Только, если что-то поменялось
export const filteredArticlesSelector = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
  const {selected, dateRange: {from, to}} = filters;

  return articles.filter(article => {
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
