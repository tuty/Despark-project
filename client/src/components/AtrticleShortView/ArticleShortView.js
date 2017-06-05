import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const ArticleShortView = props => {

    const { imageUrl, title, text, commentsCount, id } = props;

    return (
        <Link to={`/articles/${id}`} className={'article-short-view'} activeClassName={'active'}>
            <div className={'image-container'}>
                <img
                    className={'article-image'}
                    src={imageUrl}
                />
            </div>
            <div className={'details-container'}>
                <div className={'details'}>
                    <h3 className={'details__title'}>{title}</h3>
                    <p className={'details__text'}>{text}</p>
                </div>
                <div className={'details__footer'}>
                    {commentsCount}&nbsp;comments
                </div>
            </div>
        </Link>
    );
};

ArticleShortView.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    commentsCount: PropTypes.number,
    id: PropTypes.number
};

export default ArticleShortView;
