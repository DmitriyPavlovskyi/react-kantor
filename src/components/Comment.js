import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

function Comment({comment}) {
  return (
    <div>
      <p>{comment.text} <b>by {comment.user}</b></p>
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  //from connect
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
  }).isRequired
};

// У connect state отвечает за то, что пришло из store, но так же есть второй аргумент,
// в котором можно посмотреть что реально пришло в props компоненту
export default connect((state, ownProps) => {
  // Ищем в сторе по айдишнику наш коммент и отдаем его в компонент, который его и отрисует
  return {
    comment: state.comments.find(comment => comment.id === ownProps.id)
  };
})(Comment);
