import { createStore } from 'redux';
import reducer from '../reducer';

const store = createStore(reducer);

// Для удобства использования при разработке
// dev only
window.store = store;

//store.getState()  Вернет текущее состояние стора
// store.displatch({type: 'INCREMENT'}) таким образом можем вызвать событие

export default store;
