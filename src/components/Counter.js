import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Используется для того, чтоб взять данные из store (!). Фабрика декоратора
// Для использования данной штуки, необходимо ВСЁ(!) приложение обернуть в отдельный декоратор, без него работать не будет
import { connect } from 'react-redux';

class Counter extends Component {
  static propTypes = {
    counter: PropTypes.number,
    dispatch: PropTypes.object
  };

  render() {
    // this.props.counter - полезет в store забрать counter, который описан в mapStateProps
    return (
      <div>
        <h2>{this.props.counter}</h2>
        <button onClick = {this.handleIncrement}>Increment me</button>
      </div>
    );
  }

  handleIncrement = () => {
    // Так же в this.props будет метод dispatch

    console.log('---', 'incrementing');
    // УСТАРЕВШИЙ СПОСОБ ОБРАЩЕНИЯ К store
    this.props.dispatch({
      type: 'INCREMENT'
    });
  }
}

// На вход получает текущее состояние store, а возвращает то, что нам нужно вытянуть из него
// Так же в this.props запишется метод dispatch который мы сможем использовать (УСТАРЕВШИЙ СПОСОБ)
function mapStateToProps(state) {
  return {
    counter: state.count
  };
}
// Создаем декоратор из нашей фабрики и передаем в него нашу функцию
const decorator = connect(mapStateToProps);
// Оборачиваем в декоратор наш компонент
export default decorator(Counter);
// Можно будет иметь доступ к этому кейсу через - store.displatch({type: 'INCREMENT'});
