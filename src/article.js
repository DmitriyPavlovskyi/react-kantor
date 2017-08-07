import React, {Component} from 'react';

export default class  Article extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }
// Привязываем контекст к конкретному инстансу с помощью arrow function
  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  getBody() {
    if (!this.state.isOpen) return null;
    const {article} = this.props;
    return <section>{article.text}</section>
  }

  render() {
    console.log(this.props);
    const {article} = this.props;
    const {isOpen} = this.state;

    return (
      <div>
        <h3>{article.title}</h3>
        <button onClick = {this.toggleOpen}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        {this.getBody()}
      </div>
    )
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
