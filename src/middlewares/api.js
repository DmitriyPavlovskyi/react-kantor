import {START, SUCCESS, FAIL} from '../constants';

export default store => next => action => {
  // Будем принимать строку и если не получили ее, будем передавать управление дальше
  const {callAPI, type, ...rest} = action;

  if (!callAPI) {
    // вот тут передаем управление дальше
    return next(action);
  }

  next({
    ...rest, type: type + START
  });

  // Мидлвар дойдет до остальных, только когда выполнится фетч
  fetch(callAPI)
    .then(res => res.json())
    .then(response => next({...rest, type: type + SUCCESS, response}))
    // Если надо обработать ошибки то вот пример
    .catch(error => next({...rest, type: type + FAIL, error}))
};
