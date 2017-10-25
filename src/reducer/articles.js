import {normalizedArticles as defaultArticles} from '../fixtures';
import {arrToMap} from '../helpers';
import {DELETE_ARTICLE, ADD_COMMENT} from '../constants';

export default (articleState = arrToMap(defaultArticles), action) => {
  const {type, payload, randomId} = action;

  // Важно помнить, если нам нужно что-то удалить,
  // то обязательно возвращать новый массив а не менять по ссылке существующий (!!!)
  switch(type) {
  // tmpState является поверхностной копией обьекта с ссылками из которого будем удалять
  case DELETE_ARTICLE:
    const tmpState = {...articleState};
    delete tmpState[payload.id];
    return tmpState;

// Внутри создаем новую копию статьи, в которой создаем новую копию комментов. Не стоит мутировать данные!
// Если менять данные по ссылке connect сделает проверку и сравнит данные и решит, что ничего не поменялось, а на самом деле поменялось.
  case ADD_COMMENT:
    const article = articleState[payload.articleId];
    return {
      ...articleState,
      [payload.articleId]: {
        ...article,
        coments: (article.comments || []).concat(randomId)
      }
    };

  default: return articleState;
  }
};
