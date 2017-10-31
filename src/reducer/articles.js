// import {normalizedArticles as defaultArticles} from '../fixtures';
import {arrToMap} from '../helpers';
import {DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE, LOAD_ARTICLE_COMMENTS, START, SUCCESS} from '../constants';
// immutable нужен для работы с иммутабельными данными. Доступны методы get, set и т.д.
// Record нужен для того чтоб после маппинга immutable можно было в приложении так
// же обращаться к полям как и раньше .title, .id ... Поскольку сейчас
// нужно обращаться через .get('id'), .get('title') ...
import {OrderedMap, Record} from 'immutable';

// Нужно записать структуру обьекта для Record, для того чтоб можно было обращаться к полям. Пишем дефолтные данные при инициализации
const ArticleRecord = Record({
  text: undefined,
  title: '',
  id: undefined,
  loading: false,
  commentsLoading: false,
  commentsLoaded: false,
  comments: []
});

// Map не соблюдает порядок как обычные обьекты, если важен порядок можно использовать OrderedMap
const ReducerState = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap({})
});

const defaultState = new ReducerState();

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
    return articleState.deleteIn(['entities', payload.id]);

    // Внутри создаем новую копию статьи, в которой создаем новую копию комментов.
    // Не стоит мутировать данные! Если менять данные по ссылке connect сделает
    // проверку и сравнит данные и решит, что ничего не поменялось, а на самом деле поменялось.
  case ADD_COMMENT:
  // Весь код можно заменить одной строкой используя методы immutable.
  // updateIn, setIn, getIn работают с более глубокими вложенностями
  // первый параметром решаем где поменять, потом что и вторым аргументом передаем как менять
  // Опять же использовать методы, которые не мутируют массив (!)
    return articleState.updateIn(['entities', payload.articleId, 'comments'],
      comments => comments.concat(randomId));
    // const article = articleState[payload.articleId];
    // return {
    //   ...articleState,
    //   [payload.articleId]: {
    //     ...article,
    //     coments: (article.comments || []).concat(randomId)
    //   }
    // };
  case LOAD_ALL_ARTICLES + START:
    return articleState.set('loading', true);

  case LOAD_ALL_ARTICLES + SUCCESS:
    return articleState
      .set('entities', arrToMap(response, ArticleRecord))
      .set('loading', false)
      .set('loaded', true)

// Если какого-то промежуточного результата не будет, то оно не упадет с ошибкой, а setIn создаст его!
  case LOAD_ARTICLE + START:
    return articleState.setIn(['entities', payload.id, 'loading'], true);

  // В случае этого кейса просто перезапишем статью на новую
  case LOAD_ARTICLE + SUCCESS:
    return articleState.setIn(['entities', payload.id], new ArticleRecord(payload.response));

  case LOAD_ARTICLE_COMMENTS + START:
    return articleState.setIn(['entities', payload.articleId, 'commentsLoading'], true);

  case LOAD_ARTICLE_COMMENTS + SUCCESS:
    return articleState
      .setIn(['entities', payload.articleId, 'commentsLoading'], false)
      .setIn(['entities', payload.articleId, 'commentsLoaded'], true)
  default: return articleState;
  }
};
