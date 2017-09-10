import React, {Component} from 'react';
// React нужен для того, чтоб когда код будет компилится и
// превратится в React.createComponent у него был доступ к реакту

export default class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isCommentOpen: false
    };
  }
  // Привязываем контекст к конкретному инстансу с помощью arrow function
  toggleOpen = (ev) => {
    // Тут нам доступна обертка события, которую создает реакт.
    // Если вдруг нам нужно реальное событие ДОМа, тогда можно использовать ev.nativeEvent
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleCommentsOpen = (ev) => {
    this.setState({
      isCommentOpen: !this.state.isCommentOpen
    });
  }

  getBody() {
    if (!this.state.isOpen) {
      return null;
    }

    const {article} = this.props;
    return <section>{article.text}</section>;
  }

  getComments() {
    if (!this.state.isCommentOpen) {
      return null;
    }

    const {article} = this.props;
    const {isCommentOpen} = this.state;
    const articleComments = article.comments.map(comment =>
      <div key = {comment.id}>
        <p>{comment.text}</p>
        <h5>{comment.user}</h5>
      </div>)
    return <section>{articleComments}</section>;
  }

  render() {
    console.log(this.props);
    const {article} = this.props;
    const {isOpen, isCommentOpen} = this.state;
    // Деструктуризация

    return (
      <div>
        <h3>{article.title}</h3>
        <button onClick = {this.toggleOpen}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        {this.getBody()}
        {isOpen ? <button onClick = {this.toggleCommentsOpen}>
          {isCommentOpen ? 'Hide comments' : 'Open comments'}
        </button> : null}
        {this.getComments()}
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
