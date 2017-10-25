import {Map} from 'immutable';

export function arrToMap(arr) {
  // Теперь будем возвращать имутабельный Map, а не просто обьект
  // store.getState().articles ---> MAP object wrapper
  return arr.reduce((acc, item) => acc.set(item.id, new Map(item)), new Map({}));
}

export function mapToArr(obj) {
  return obj.valueSeq().toArray();
}
