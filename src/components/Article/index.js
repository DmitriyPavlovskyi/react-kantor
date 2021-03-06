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
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    // from connect
    article: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })
  }

//updateIndex нужен для уникальных ключей комментариев
  state = {
    updateIndex: 0,
    areCommentsOpen: false
  }

  componentDidMount() {
    const {loadArticle, article, id} = this.props;

    if (!article || (!article.text && !article.loading)) {
      loadArticle(id);
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

  setCommentsRef = ref => {
    this.comments = ref;
    //console.log('---', ref)
  }

  handleDelete = () => {
    const {deleteArticle, article} = this.props;

    deleteArticle(article.id);
    console.log('---', 'deleting article');
  }

  render() {
    const {article, isOpen, toggleOpen} = this.props;

    if (!article) {
      return null;
    }

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
export default connect((state, ownProps) => ({
  article: state.articles.entities.get(ownProps.id)
}), { deleteArticle, loadArticle })(Article);
