import React, { Component as ReactComponent } from 'react';

// Декоратор (компоненты высшего порядка) - это функция обертка, которая принимает на вход компонент и возвращает измененный.
// Используется для повторяющегося кода, который нужно переиспользовать
export default (OriginalComponent) => class WrappedComponent extends ReactComponent {
  state = {
    isOpen: false
  }
  render() {
    // С помощью spread оператора ( {...} ) мы передаем "транзитом" пропсы в наш компонент
    return <OriginalComponent {...this.props} {...this.state} toggleOpen = {this.toggleOpen} />;
  }

  // Привязываем контекст к конкретному инстансу с помощью arrow function
  toggleOpen = (ev) => {
    // Тут нам доступна обертка события, которую создает реакт.
    // Если вдруг нам нужно реальное событие ДОМа, тогда можно использовать ev.nativeEvent
    // Проверка на существование ивента, на случай, если он перестанет приходить
    ev && ev.preventDefault && ev.preventDefault();
    console.log('---', ev.nativeEvent)
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
};
