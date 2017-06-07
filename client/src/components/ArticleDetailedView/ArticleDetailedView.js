import React, { Component } from 'react';
import PropTypes from 'prop-types';

import provider from '../../providers/provider';
import Comment from '../Comment/Comment';

class ArticledetailedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentComment: '',
            comments: []
        };
        this.addComment = this.addComment.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.updateComments = this.updateComments.bind(this);
        this.renderComments = this.renderComments.bind(this);
    }

    // componentWillMount() {

    // }

    componentDidMount() {
        const { id } = this.props.article;

        this.updateComments(id);
    }

    componentWillReceiveProps(nextProps) {
        const articleId = this.props.article.id;
        const NewArticleId = nextProps.article.id;


        if (articleId !== NewArticleId) {
            this.setState({
                comments: []
            });
        }
        this.updateComments(NewArticleId);
    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    // componentWillUpdate(nextProps, nextState) {

    // }

    // componentDidUpdate(prevProps, prevState) {

    // }

    // componentWillUnmount() {

    // }

    addComment(ev) {
        this.setState({
            currentComment: ev.target.value
        });
    }

    sendComment() {
        const { sendComment, article } = this.props;
        const { id } = article;
        const comment = this.state.currentComment;

        sendComment(id, comment).then(() => {
            this.updateComments(id);
        });

        this.setState({
            currentComment: ''
        });
    }

    updateComments(id) {

        provider.getComments(id).then((result) => {
            this.setState({
                comments: result.data
            });
        });
    }

    renderComments(comments) {
        return comments.map((com) => (
            <Comment comment={com} key={com.id} />
        ));
    }

    render() {
        const { imageUrl, text, title } = this.props.article;
        const { currentComment, comments } = this.state;

        console.log(comments);

        return (
            <div className={'article-detailed-view'}>
                <div className={'title-container'}>
                    <h1>{title}</h1>
                </div>
                <div className={'image-container'}>
                    <img src={imageUrl} />
                </div>
                <p className={'text-container'}>
                    {text}
                </p>
                <div className={'comments-container'}>
                    <h1>Comments</h1>
                    <textarea cols="30" rows="8" value={currentComment} placeholder={'Body of comment'} onChange={this.addComment} />
                    <div className={'send-comment-button-container'}>
                        <button onClick={this.sendComment}>Send Comment</button>
                    </div>
                    <div className={'comments-container'}>
                        {this.renderComments(comments)}
                    </div>
                </div>
            </div>
        );
    }
}

ArticledetailedView.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number,
        commentsCount: PropTypes.number,
        imageUrl: PropTypes.string,
        text: PropTypes.string,
        title: PropTypes.string
    }),
    sendComment: PropTypes.func
};

export default ArticledetailedView;
