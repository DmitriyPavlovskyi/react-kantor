import {Map, OrderedMap} from 'immutable';
// Map не соблюдает порядок как обычные обьекты, если важен порядок можно использовать OrderedMap

// Вторым параметром передаем структуру данных Record. Так же надо дать значение по умолчанию
export function arrToMap(arr, DataRecord = Map) {
  // Теперь будем возвращать имутабельный Map, а не просто обьект
  // store.getState().articles ---> MAP object wrapper
  // OrderedMap тут нужен для того, чтоб при удалении статьи
  // у нас на первое место становилась правильная из них
  return arr.reduce((acc, item) => acc.set(item.id, DataRecord(item)), new OrderedMap({}));
}

export function mapToArr(obj) {
  return obj.valueSeq().toArray();
}
