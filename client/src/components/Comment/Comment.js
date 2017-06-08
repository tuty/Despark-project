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
            replies: [],
            loadedReplies: false,
            repliesCount: this.props.comment.repliesCount,

        };
        this.toogleReplies = this.toogleReplies.bind(this);
        this.renderComment = this.renderComment.bind(this);
        this.getRelativeTime = this.getRelativeTime.bind(this);
        this.toogleReplyInput = this.toogleReplyInput.bind(this);
        this.handleChangeTextAreaInput = this.handleChangeTextAreaInput.bind(this);
        this.sendReply = this.sendReply.bind(this);
        this.renderReplies = this.renderReplies.bind(this);
        this.toogleReplies = this.toogleReplies.bind(this);
        this.getReplies = this.getReplies.bind(this);
        this.renderShowReplyButtonText = this.renderShowReplyButtonText.bind(this);
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
        this.setState({
            showReplies: !this.state.showReplies,
            loadedReplies: false
        });
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

    sendReply(ev) {

        const { currentReply } = this.state;
        const { id } = this.props.comment;

        if (ev.charCode === 13) {
            ev.preventDefault();
            provider.addReply(id, currentReply)
                .then(() => {
                    this.setState({
                        currentReply: '',
                        showReplyInput: !this.state.showReplyInput,
                        repliesCount: this.state.repliesCount + 1
                    });
                });
        }

    }

    getReplies(parentCommentId) {
        provider.getReplies(parentCommentId).then((res) => {
            this.setState({
                replies: [...res.data],
                loadedReplies: true
            });
        });
    }

    getRelativeTime(timestamp) {
        return moment(timestamp, 'x').fromNow();
    }

    renderShowReplyButtonText(showReplies, repliesCount, loadedReplies) {

        let textButton = `${repliesCount} replies`;

        if (repliesCount === 1) {
            textButton = '1 reply';
        }

        if(showReplies && loadedReplies) {
            textButton = `hide replies`;
        }

        if(!repliesCount) {
            textButton = `no replies`;
        }

        return textButton;
    }

    renderReplies(parentCommentId) {
        const { replies, loadedReplies } = this.state;

        this.getReplies(parentCommentId);

        return (
            <div className={'replies-container'}>
                {loadedReplies && replies && replies.map((reply) => (<Comment comment={reply} key={reply.id}/>))}
            </div>
        );
    }

    renderReplyInput() {
        const { currentReply } = this.state;

        return (
            <div className={'reply-input-container'}>
                <textarea cols="30" rows="8" value={currentReply} placeholder={'Body of reply'} onChange={this.handleChangeTextAreaInput} onKeyPress={this.sendReply}/>
            </div>
        );
    }

    renderComment(comment) {
        const { showReplyInput, showReplies, loadedReplies, repliesCount } = this.state;
        const { author, createdAt, id, text } = comment;

        return (
            <div className={'comment'}>
                <div className={'comment-header'}>
                    <div>
                        <span className={'comment-header__autor'}>{author}</span>
                        <span className={'comment-header__relative-time'}><i>{this.getRelativeTime(createdAt)}</i></span>
                    </div>
                    <div>
                        <button className={'comment-header__toogle-replies-button'} onClick={this.toogleReplies}>{this.renderShowReplyButtonText(showReplies, repliesCount, loadedReplies)}</button>
                        <button className={'comment-header__reply-button'} onClick={this.toogleReplyInput}>{`${showReplyInput ? 'discard reply' : 'reply'}`}</button>
                    </div>
                </div>
                <div className={'comment-content'}>{text}</div>
                {showReplyInput &&
                    this.renderReplyInput()}
                {showReplies &&
                    this.renderReplies(id)}
            </div>
        );
    }

    render() {
        const { comment } = this.props;

        return (
            <div className={'comment-wrapper'}>
                {this.renderComment(comment)}
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object
};

export default Comment;
