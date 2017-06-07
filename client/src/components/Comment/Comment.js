import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import provider from '../../providers/provider';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReplies: false,
            showReplyInput: false,
            currentReply: '',
        };
        this.toogleReplies = this.toogleReplies.bind(this);
        this.renderTopLevelComment = this.renderTopLevelComment.bind(this);
        this.getRelativeTime = this.getRelativeTime.bind(this);
        this.toogleReplyInput = this.toogleReplyInput.bind(this);
        this.handleChangeTextAreaInput = this.handleChangeTextAreaInput.bind(this);
        this.sendReply = this.sendReply.bind(this);
    }

    // componentWillMount() {

    // }

    componentDidMount() {

    }

    // componentWillReceiveProps(nextProps) {

    // }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    // componentWillUpdate(nextProps, nextState) {

    // }

    // componentDidUpdate(prevProps, prevState) {

    // }

    // componentWillUnmount() {

    // }

    toogleReplies() {

    }

    toogleReplyInput() {
        this.setState({
            currentReply: '',
            showReplyInput: !this.state.showReplyInput
        });
    }

    handleChangeTextAreaInput(ev) {
        this.setState({
            currentReply: ev.target.value
        });
    }

    sendReply(parentCommentId, reply) {
        provider.addReply(parentCommentId, reply)
            .then(() => {
                this.setState({
                    currentReply: '',
                    showReplyInput: !this.state.showReplyInput
                });
            });
    }

    getRelativeTime(timestamp) {
        return moment(timestamp, 'x').fromNow();
    }

    renderReply() {

    }

    renderReplyInput(parrentCommentId) {
        const { currentReply } = this.state;

        return (
            <div className={'reply-input-container'}>
                <textarea cols="30" rows="8" value={currentReply} placeholder={'Body of reply'} onChange={this.handleChangeTextAreaInput} />
                <button className={'add-reply-button'} onClick={() => this.sendReply(parrentCommentId, currentReply)}>Add Reply</button>
            </div>
        )
}

renderTopLevelComment(comment) {
    const { showReplyInput } = this.state;
    const { articleId, author, createdAt, id, parentCommentId, repliesCount, text } = comment;

    return (
        <div className={'comment'}>
            <div className={'comment-header'}>
                <div>
                    <span className={'comment-header__autor'}>{author}</span>
                    <span className={'comment-header__created-at'}>{this.getRelativeTime(createdAt)}</span>
                </div>
                <div>
                    <button className={'comment-header__toogle-replies-button'}>{`${repliesCount > 0 ? repliesCount : 'no'} replies`}</button>
                    <button className={'comment-header__reply-button'} onClick={this.toogleReplyInput}>{`${showReplyInput ? 'discard reply' : 'reply'}`}</button>
                </div>
            </div>
            <div className={'comment-content'}>{text}</div>
            {showReplyInput &&
                   this.renderReplyInput(id)}
            </div>
        );
    }

    render() {

        const {comment} = this.props;

        return (
            <div className={'comment-wrapper'}>
                {this.renderTopLevelComment(comment)}
            </div>
            );
    }
}

Comment.propTypes = {
                comment: PropTypes.object
};

export default Comment;
