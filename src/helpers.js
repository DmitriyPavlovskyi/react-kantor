import {Map} from 'immutable';

// Вторым параметром передаем структуру данных Record. Так же надо дать значение по умолчанию
export function arrToMap(arr, DataRecord = Map) {
  // Теперь будем возвращать имутабельный Map, а не просто обьект
  // store.getState().articles ---> MAP object wrapper
  return arr.reduce((acc, item) => acc.set(item.id, DataRecord(item)), new Map({}));
}

export function mapToArr(obj) {
  return obj.valueSeq().toArray();
}
