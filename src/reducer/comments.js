import {normalizedComments as defaultComments} from '../fixtures';
import {} from '../constants';

export default (commentsState = defaultComments, action) => {
  const {type, payload} = action

  switch (type) {
  }

  return commentsState;
};
