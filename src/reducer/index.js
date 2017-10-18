import {combineReducers} from 'redux';
import counterReducer from './counter';
import articles from './articles';

// ES6 на примере articles, можно передавать только его, без ключа
export default combineReducers({
  count: counterReducer,
  articles
});
