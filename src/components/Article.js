import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentList from './CommentList';
// React нужен для того, чтоб когда код будет компилится и
// превратится в React.createComponent у него был доступ к реакту
import toggleOpen from '../decorators/toggleOpen';

class Article extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    article: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  }

  getBody() {
    const { article, isOpen } = this.props;
    if (!isOpen) {
      return null;
    }

    return (
      <section>
        {article.text}
        <CommentList comments = {article.comments}/>
      </section>
    );
  }

  render() {
    const {article, isOpen, toggleOpen } = this.props;
    // Деструктуризация

    return (
      <div>
        <h3>{article.title}</h3>
        <button onClick = {toggleOpen}>
          {isOpen ? 'close' : 'open'}
        </button>
        {this.getBody()}
      </div>
    );
  }
}

// Функциональное использование создания примитивных компонентов
// export default function Article(props) {
//   console.log(props);
//   const {article} = props;
//
//   return (
//     <div>
//       <h3>{article.title}</h3>
//       <section>{article.text}</section>
//     </div>
//   )
// }

export default toggleOpen(Article);
