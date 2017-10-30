import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import logger from '../middlewares/logger';
import randomId from '../middlewares/randomId';
import api from '../middlewares/api';
// с помощью thunk можно возвращать не только обьекты, но и функции, в таком случае мидлвара просто ее вызовет
import thunk from 'redux-thunk';

// Сюда записываем все мидлвары которые будут через запятую
const enhancer = applyMiddleware(thunk, randomId, api, logger);

// А сюда третим параметром их передаем
const store = createStore(reducer, {}, enhancer);

// Для удобства использования при разработке
// dev only
window.store = store;

//store.getState()  Вернет текущее состояние стора
// store.dispatch({type: 'INCREMENT'}) таким образом можем вызвать событие

export default store;
