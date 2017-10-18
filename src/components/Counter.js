import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Используется для того, чтоб взять данные из store (!). Фабрика декоратора
// Для использования данной штуки, необходимо ВСЁ(!) приложение обернуть в отдельный декоратор, без него работать не будет
import { connect } from 'react-redux';
import { increment } from '../AC';

class Counter extends Component {
  static propTypes = {
    counter: PropTypes.number,
    dispatch: PropTypes.func,
    increment: PropTypes.func
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
    // Пробрасываем наше событие через connect и имеем к нему доступ из props
    // ES5
    // this.props.dispatchIncrement();
    // ES6
    this.props.increment();

    // Если будет несколько actions, то делаем деструктуризацию и вызываем по отдельности
    // Но очень важно не забывать вытягивать эту функцию из this.props,
    // поскольку если этого не сделать,
    // код не поломается но не будет ошибок и ничего не будет работать (!)
    // const {increment} = this.props;
    // increment();
  }
}

// На вход получает текущее состояние store, а возвращает то, что нам нужно вытянуть из него
// Так же в this.props запишется метод dispatch который мы сможем использовать (УСТАРЕВШИЙ СПОСОБ)
// Эта функция связывает props компонента с state store (!)
// function mapStateToProps(state) {
//   return {
//     counter: state.count
//   };
// }

// ES5
// const mapToDispatch = {
//   dispatchIncrement: increment
// };

// ES6
// const mapToDispatch = { increment };

// Создаем декоратор из нашей фабрики и передаем в него нашу функцию
// Вторым параметром коннект может принимать обьект, через ключ которого
// мы будем иметь доступ к событию в action creator, которе будем диспатчить

// const decorator = connect(mapStateToProps, mapToDispatch);

// Оборачиваем в декоратор наш компонент

// export default decorator(Counter);
// Можно будет иметь доступ к этому кейсу через - store.displatch({type: 'INCREMENT'});

// А ниже описано тоже самое, только с использованием каррирования и best practices (!)

// Первый аргумент connect - возможность получить данные из Store
// А второй - сообщить, что компонент как-то повлиял на систему (?)
//             connect(mapStateToProps,                  mapToDispatch)   (Counter)
export default connect((state) => ({counter: state.count}), { increment })(Counter);
