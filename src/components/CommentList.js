import React, {Component} from 'react';
import Comment from './Comment';
import toggleOpen from '../decorators/toggleOpen'

class CommentList extends Component {
  getBody() {
    const {comments, isOpen, toggleOpen} = this.props;
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
