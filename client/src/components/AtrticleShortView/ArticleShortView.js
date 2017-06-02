import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const ArticleShortView = props => {

    const { imageUrl, title, text, commentsCount } = props;

    return (
        <div className={'article-short-view'}>
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
                     <Link to={''}> {commentsCount}&nbsp;comments </Link>
                </div>
            </div>
        </div>
    );
};

ArticleShortView.propTypes = {

};

export default ArticleShortView;
