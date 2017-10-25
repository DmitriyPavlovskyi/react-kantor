// import {normalizedArticles as defaultArticles} from '../fixtures';
import {arrToMap} from '../helpers';
import {DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES} from '../constants';
// immutable нужен для работы с иммутабельными данными. Доступны методы get, set и т.д.
import {Map} from 'immutable';

const defaultState = new Map({});

export default (articleState = defaultState, action) => {
  const {type, payload, response, randomId} = action;

  // Важно помнить, если нам нужно что-то удалить,
  // то обязательно возвращать новый массив а не менять по ссылке существующий (!!!)
  switch(type) {
  // tmpState является поверхностной копией обьекта с ссылками из которого будем удалять
  case DELETE_ARTICLE:
    // С помощью immutable можно использовать его родной delete метод
    // const tmpState = {...articleState};
    // delete tmpState[payload.id];
    return articleState.delete(payload.id);

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

  case LOAD_ALL_ARTICLES:
    return arrToMap(response);

  default: return articleState;
  }
};
