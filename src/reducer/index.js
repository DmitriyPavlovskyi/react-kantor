import {combineReducers} from 'redux';
import counterReducer from './counter';
import articles from './articles';
import comments from './comments';
import filters from './filters';

// ES6 на примере articles, можно передавать только его, без ключа
export default combineReducers({
  count: counterReducer,
  articles, comments, filters
});
