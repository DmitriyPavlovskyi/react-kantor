import React from 'react';
import PropTypes from 'prop-types';
import App from './App';
import store from '../store';
// Для того, чтоб можно было вытягивать данные из store использую connect, нужно обернуть приложение в Provider и передать ему store
import { Provider } from 'react-redux';

function Root(props) {
  return (
    <Provider store = {store}>
      <App {...props}/>
    </Provider>
  );
}

Root.propTypes = {

};

export default Root;
