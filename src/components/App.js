import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Articles from './routes/Articles';
import UserForm from './UserForm';
import Filters from './Filters';
import NotFound from './routes/NotFound';
import CommentsPage from './routes/CommentsPage';
import Counter from './Counter';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
// switch нужен для того чтоб избежать поведения, когда рендерится несколько роутов одновременно
// Сверху описывать наиболее точные пути
import 'react-select/dist/react-select.css';

class App extends Component {
    static propTypes = {
    };

    render() {
      return (
        <Router>
          <div>
            <div>
              <h2>Main menu</h2>
              <div><NavLink activeStyle = {{color: 'red'}} to = '/counter'>Counter</NavLink></div>
              <div><NavLink activeStyle = {{color: 'red'}} to = '/filters'>Filters</NavLink></div>
              <div><NavLink activeStyle = {{color: 'red'}} to = '/articles'>Articles</NavLink></div>
            </div>
            <UserForm />
            <Switch>
              <Route path = '/counter' component = {Counter} />
              <Route path = '/filters' component = {Filters} />
              <Route path = '/articles' component = {Articles} />
              <Route path = '/comments/:page' component = {CommentsPage} />
              <Route path = '*' component = {NotFound} />
            </Switch>
          </div>
        </Router>
      );
    }

    // changeSelection = selection => this.setState({ selection })
}

export default App;
