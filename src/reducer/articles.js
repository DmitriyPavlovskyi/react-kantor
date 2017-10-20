import {normalizedArticles as defaultArticles} from '../fixtures';
import {DELETE_ARTICLE} from '../constants';

export default (articleState = defaultArticles, action) => {
  const {type, payload} = action;

  // Важно помнить, если нам нужно что-то удалить,
  // то обязательно возвращать новый массив а не менять по ссылке существующий (!!!)
  switch(type) {
  case DELETE_ARTICLE: return articleState.filter(article => article.id !== payload.id);

  default: return articleState;
  }
};
