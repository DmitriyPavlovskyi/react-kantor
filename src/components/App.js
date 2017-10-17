import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleList from './ArticleList';
import ArticlesChart from './ArticlesChart';
import UserForm from './UserForm';
import Select from 'react-select';
import Filters from './Filters';
import Counter from './Counter';
import 'react-select/dist/react-select.css';

class App extends Component {
    static propTypes = {

    };

    render() {
      const {articles} = this.props;
      return (
        <div>
          <Counter />
          <UserForm />
          <Filters articles = {articles}/>
          <ArticleList articles = {this.props.articles} />
          <ArticlesChart articles = {this.props.articles} />
        </div>
      );
    }

    changeSelection = selection => this.setState({ selection })
}

export default App;
