import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Article from './Article';
import accordion from '../decorators/accordion';
import {connect} from 'react-redux';
import {filteredArticlesSelector} from '../selectors';

class ArticleList extends Component {
  static propTypes = {
    // from connect
    articles: PropTypes.array.isRequired,
    // from accordion
    openItemId: PropTypes.string,
    toggleOpenItem: PropTypes.func.isRequired
  }

  // Reverse data flow pattern. Управляем состоянием родителя из дочернего компонента <Article>
  render() {
    const { articles, openItemId, toggleOpenItem } = this.props;
    // Каждый элемент массива должен содержать свой уникальный ключ
    const articleElements = articles.map(article => <li key = {article.id}>
      <Article
        article = {article}
        isOpen = {article.id === openItemId}
        toggleOpen = {toggleOpenItem(article.id)}
      />
    </li>);

    return (
      <ul>
        {articleElements}
      </ul>
    );
  }
}
// Если используется несколько декораторов, иногда важна последовательность
// export default connect(state => ({articles: state.articles}))(accordion(ArticleList));

// Лучшее место чтоб произвести фильтрацию - connect
export default connect((state) => {
  return {
    articles: filteredArticlesSelector(state)
  };
})(accordion(ArticleList));
