export default store => next => action => {
  // Будем принимать строку и если не получили ее, будем передавать управление дальше
  const {callAPI} = action;

  if (!callAPI) {
    // вот тут передаем управление дальше
    return next(action);
  }

  fetch(callAPI)
    .then(res => res.json())
    .then(response => next({...action, response}));
};
