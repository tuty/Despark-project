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
            loadedReplies: false,
            currentReply: '',
            replies: [],
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
        this.getToogleRepliesButtonClassName = this.getToogleRepliesButtonClassName.bind(this);
    }

    toogleReplies() {
        const { id } = this.props.comment;

        this.setState({
            showReplies: !this.state.showReplies,
            loadedReplies: false
        });
        window.setTimeout(() => {
            if (this.state.showReplies) {            
                this.getReplies(id);
            } else {
                this.setState({
                    replies: []
                });
            }
        }, 0);
    }

    getReplies(parentCommentId) {
        provider.getReplies(parentCommentId).then((res) => {
            this.setState({
                replies: [...res.data],
                loadedReplies: true
            });
        });
    }

    getToogleRepliesButtonClassName() {
        const { repliesCount } = this.state;
        let className = 'comment-header__toogle-replies-button';

        if (repliesCount === 0) {
            className += ' disabled';
        }

        return className;
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
                .then((res) => {
                    this.setState({
                        currentReply: '',
                        showReplyInput: !this.state.showReplyInput,
                        repliesCount: this.state.repliesCount + 1
                    });
                    if (this.state.showReplies) {            
                        this.setState({
                            replies: [...this.state.replies, res.data]
                        });
                    }
                });
        }

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

    renderReplies() {
        const { replies, loadedReplies } = this.state;

        return (
            <div className={'replies-container'}>
                {loadedReplies && replies.map((reply) => (<Comment comment={reply} key={reply.id}/>))}
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

    render() {
        const { comment } = this.props;
        const { showReplyInput, showReplies, loadedReplies, repliesCount, replies } = this.state;
        const { author, createdAt, text } = comment;

        return (
            <div className={'comment'}>
                <div className={'comment-header'}>
                    <div>
                        <span className={'comment-header__autor'}>{String(author).replace(/[\[\]]/g, '').trim()}</span>
                        <span className={'comment-header__relative-time'}><i>{this.getRelativeTime(createdAt)}</i></span>
                    </div>
                    <div>
                        <button className={this.getToogleRepliesButtonClassName()} onClick={this.toogleReplies}>{this.renderShowReplyButtonText(showReplies, repliesCount, loadedReplies)}</button>
                        <button className={'comment-header__reply-button'} onClick={this.toogleReplyInput}>{`${showReplyInput ? 'discard reply' : 'reply'}`}</button>
                    </div>
                </div>
                <div className={'comment-content'}>{text}</div>
                {showReplyInput &&
                    this.renderReplyInput()}
                {showReplies && replies.length > 0 &&
                    this.renderReplies()}
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object
};

export default Comment;
