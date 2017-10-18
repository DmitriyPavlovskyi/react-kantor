import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteArticle} from '../../AC';
import CommentList from '../CommentList';
// React нужен для того, чтоб когда код будет компилится и
// превратится в React.createComponent у него был доступ к реакту
import toggleOpen from '../../decorators/toggleOpen';
import {CSSTransitionGroup} from 'react-transition-group';
// С помощью CSSTransitionGroup мы может добавлять анимацию на добавление/удаление элементов, но не на изменение!
import './style.css';

class Article extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    article: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
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
        <button onClick={this.handleDelete}>Delete article</button>
        <CSSTransitionGroup
          transitionName="article"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component='div'
        >
          {this.getBody()}
        </CSSTransitionGroup>
      </div>
    );
  }

  handleDelete = () => {
    const {deleteArticle, article} = this.props;

    deleteArticle(article.id);
    console.log('---', 'deleting article');
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

// Если нам ничего не надо вытягивать из store, то первый аргумент ставим null
export default connect(null, { deleteArticle })(Article);
