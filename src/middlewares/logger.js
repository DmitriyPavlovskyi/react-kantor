export default store => next => action => {
  // Состояние до и после того как задиспатчится экшн
  console.log('middleware logger state before', store.getState());
  next(action);
  console.log('middleware logger state after', store.getState());
};

// Middlewares нужны для обработки side effects,
// и это пожалуй единственное место, где мы можем лезть в store
// Они будут вызываться на каждый экшн!
// Именно по этому их надо писать максимально реюзабельными!
