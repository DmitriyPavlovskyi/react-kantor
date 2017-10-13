import React, { Component } from 'react';
import Article from './Article';

export default class ArticleList extends Component {
  state = {
    openArticleId: null
  }
  // Reverse data flow pattern. Управляем состоянием родителя из дочернего компонента <Article>

  render() {
    // Каждый элемент массива должен содержать свой уникальный ключ
    const articleElements = this.props.articles.map(article => <li key = {article.id}>
      <Article
        article = {article}
        isOpen = {article.id === this.state.openArticleId}
        toggleOpen = {this.toggleOpenArticle(article.id)}
      />
    </li>);

    return (
      <ul>
        {articleElements}
      </ul>
    );
  }

// Каррирование
  toggleOpenArticle = openArticleId => ev => {
    this.setState({ openArticleId });
  }
}
