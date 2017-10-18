import {DELETE_ARTICLE, INCREMENT} from '../constants';

export function increment() {
  // Это чистая функция, которая попросту создаст обьект action creator
  return {
    type: INCREMENT
  };
}

export function deleteArticle(id) {
  return {
    type: DELETE_ARTICLE,
    payload: { id }
  };
}
