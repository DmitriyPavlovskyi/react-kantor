import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentList from './CommentList';
// React нужен для того, чтоб когда код будет компилится и
// превратится в React.createComponent у него был доступ к реакту

export default class Article extends Component {
  static propTypes = {
    article: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string
    }).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  // Привязываем контекст к конкретному инстансу с помощью arrow function
  toggleOpen = (ev) => {
    // Тут нам доступна обертка события, которую создает реакт.
    // Если вдруг нам нужно реальное событие ДОМа, тогда можно использовать ev.nativeEvent
    ev.preventDefault();
    console.log('---', ev.nativeEvent)
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getBody() {
    if (!this.state.isOpen) {
      return null;
    }

    const { article } = this.props;
    return (
      <section>
        {article.text}
        <CommentList comments = {article.comments}/>
      </section>
    );
  }

  render() {
    const {article} = this.props;
    const {isOpen} = this.state;
    // Деструктуризация

    return (
      <div>
        <h3>{article.title}</h3>
        <button onClick = {this.toggleOpen}>
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
