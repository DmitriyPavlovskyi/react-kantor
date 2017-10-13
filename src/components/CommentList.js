import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import toggleOpen from '../decorators/toggleOpen';

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired
  }
  getBody() {
    const {comments, isOpen} = this.props;
    if (!isOpen) {
      return null;
    }

    if (!comments || !comments.length) {
      return <p>No comments yet</p>;
    }

    return (
      <ul>
        {comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)}
      </ul>
    );
  }

  render() {
    const text = this.props.isOpen ? 'Hide comments' : 'Show comments';
    return (
      <div>
        <button onClick = {this.props.toggleOpen}>{text}</button>
        {this.getBody()}
      </div>
    );
  }
}

export default toggleOpen(CommentList);
