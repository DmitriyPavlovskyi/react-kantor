import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {filteredArticlesSelector} from '../selectors';
import {loadAllArticles} from '../AC';
import Loader from './Loader';
import {NavLink} from 'react-router-dom';

class ArticleList extends Component {
  static propTypes = {
    // from connect
    articles: PropTypes.array.isRequired,
    // from accordion
    openItemId: PropTypes.string,
    toggleOpenItem: PropTypes.func
  }

  componentDidMount() {
    const {loaded, loading, loadAllArticles} = this.props;

    if (!loaded && !loading) {
      loadAllArticles();
    }
  }

  // Reverse data flow pattern. Управляем состоянием родителя из дочернего компонента <Article>
  render() {
    console.log('---', 'update article list');
    const { articles, loading } = this.props;
    if (loading) {
      return <Loader />;
    }
    // Каждый элемент массива должен содержать свой уникальный ключ
    const articleElements = articles.map(article => <li key = {article.id}>
      <NavLink to = {`/articles/${article.id}`} activeStyle = {{color: 'red'}}>
        {article.title}
      </NavLink>
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

// loadAllArticles тут через мидлвару отправляем запрос на /api/article
// Лучшее место чтоб произвести фильтрацию - connect
export default connect((state) => {
  return {
    articles: filteredArticlesSelector(state),
    loading: state.articles.loading,
    loaded: state.articles.loaded
  };
}, {loadAllArticles})(ArticleList);
