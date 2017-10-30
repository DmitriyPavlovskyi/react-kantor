import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteArticle, loadArticle} from '../../AC';
import CommentList from '../CommentList';
// С помощью CSSTransitionGroup мы может добавлять анимацию на добавление/удаление элементов, но не на изменение!
import {CSSTransitionGroup} from 'react-transition-group';
import './style.css';
import Loader from '../Loader';

class Article extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    article: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string
    }).isRequired
  }

//updateIndex нужен для уникальных ключей комментариев
  state = {
    updateIndex: 0
  }

  componentWillReceiveProps({isOpen, loadArticle, article}) {
    if (isOpen && !article.text && !article.loading) {
      loadArticle(article.id);
    }
  }

  getBody() {
    const {article, isOpen} = this.props;

    if (!isOpen) {
      return null;
    }

    if (article.loading) {
      return <Loader />;
    }
    return (
      <section>
        {article.text}
        <button onClick = {() => this.setState({updateIndex: this.state.updateIndex + 1})}>update</button>
        <CommentList article = {article} ref = {this.setCommentsRef} key = {this.state.updateIndex}/>
      </section>
    );
  }

  handleDelete = () => {
    const {deleteArticle, article} = this.props;

    deleteArticle(article.id);
    console.log('---', 'deleting article');
  }

  render() {
    const {article, isOpen, toggleOpen} = this.props;

    return (
      <div ref = {this.setContainerRef}>
        <h3>{article.title}</h3>
        <button onClick = {toggleOpen}>
          {isOpen ? 'close' : 'open'}
        </button>
        <button onClick = {this.handleDelete}>delete me</button>
        <CSSTransitionGroup
          transitionName = 'article'
          transitionAppear
          transitionEnterTimeout = {300}
          transitionLeaveTimeout = {500}
          transitionAppearTimeout = {500}
          component = 'div'
        >
          {this.getBody()}
        </CSSTransitionGroup>
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

// Если нам ничего не надо вытягивать из store, то первый аргумент ставим null
export default connect(null, { deleteArticle, loadArticle })(Article);
