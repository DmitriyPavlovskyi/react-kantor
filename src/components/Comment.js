import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {commentSelectorFactory} from '../selectors';

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

// Если обернуть mapStateToProps в еще одну функцию, то с помощью замыкания
// можно сохранить commentSelector, тогда он будет
// для каждого инстанса отдельно, а не на класс в целом
// и тогда, когда мы будем инкрементить, у нас не будут пересоздаваться все комменты
// До этого commentSelector создавался один раз для всего класса, а он не запоминает
// больше чем одно состояние назад, и когда у нас создается 5 комментов,
// то он соответственно 5 раз перезапишется, а теперь для каждого инстанса комментов,
// у нас будет отдельный селектор (!)
const mapStateToProps = () => {
  const commentSelector = commentSelectorFactory();
  return (state, ownProps) => {
    // Ищем в сторе по айдишнику наш коммент и отдаем его в компонент Comment,
    // который его и отрисует
    // Таким образом используя селекторы/реселекторы мы отделили бизнес логику
    return {
      comment: commentSelector(state, ownProps)
    };
  };
};

// У connect state отвечает за то, что пришло из store, но так же есть второй аргумент,
// в котором можно посмотреть что реально пришло в props компоненту
export default connect(mapStateToProps)(Comment);
