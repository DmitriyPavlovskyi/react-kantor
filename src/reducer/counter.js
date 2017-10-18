// Нужно задавать дефолтное значение начального состояния с которым будет проходить инициализация редьюсера, поскольку будет крашится
export default (count = 0, action) => {
  const {type} = action;

  switch(type) {
    // Можно будет иметь доступ к этому кейсу через - store.displatch({type: 'INCREMENT'})
  case 'INCREMENT': return count + 1;

  default: return count;
  }
};
