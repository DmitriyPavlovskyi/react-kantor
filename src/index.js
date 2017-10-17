import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {articles} from './fixtures';
import store from './store';

render(<App articles = {articles} />, document.getElementById('container'));
