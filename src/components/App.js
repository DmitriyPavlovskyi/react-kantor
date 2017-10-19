import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ArticleList from './ArticleList';
import UserForm from './UserForm';
import Filters from './Filters';
import Counter from './Counter';
import 'react-select/dist/react-select.css';

class App extends Component {
    static propTypes = {
      articles: PropTypes.array
    };

    render() {
      //-------------------- ДОБАВИТЬ ДАННЫЕ В Filters ЧЕРЕЗ СТОР---------------------
      return (
        <div>
          <Counter />
          <UserForm />
          <Filters articles = {[]}/>
          <ArticleList />
        </div>
      );
    }

    changeSelection = selection => this.setState({ selection })
}

export default App;
