import React, { Component } from 'react';
import PropTypes from 'prop-types';

import provider from '../../providers/provider';
import ArticleShortView from '../AtrticleShortView/ArticleShortView';

const LISTING_ARTICLES_COUNT = 4;

class ArticlesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            offset: 0,
            articlesTotalCount: 0
        };
        this.rendeArticlesList = this.rendeArticlesList.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        const { articles, offset } = this.state;

        provider.getSliceOfArticles(offset, LISTING_ARTICLES_COUNT)
            .then((result) => {
                this.setState({
                    articles: [...articles, ...result.data],
                    offset: offset + LISTING_ARTICLES_COUNT,
                    articlesTotalCount: result.totalCount
                });
            });
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

    rendeArticlesList(articles) {
        return (<ul className={'articles-list'}>
            {articles.map((art) => {
                return (<li key={art.id} className={'articles-list__item'}>
                    <ArticleShortView {...art} />
                </li>);
            })}
        </ul>);
    }

    render() {

        const { articles } = this.state;
        console.log(articles);

        return (
            <main>
                <aside className={'articles-container'}>
                    {this.rendeArticlesList(articles)}
                </aside>
                <article className={'article-detailed-view'}>
                    <h1>App work</h1>
                </article>
            </main>

        );
    }
}

ArticlesPage.propTypes = {

};

export default ArticlesPage;
