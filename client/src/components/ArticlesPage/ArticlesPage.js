import React, { Component } from 'react';
import PropTypes from 'prop-types';

import provider from '../../providers/provider';
import ArticleShortView from '../AtrticleShortView/ArticleShortView';
import ArticleDetailedView from '../ArticleDetailedView/ArticleDetailedView';

const LISTING_ARTICLES_COUNT = 4;

class ArticlesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            offset: 0,
            articlesTotalCount: 0
        };
        this.renderArticlesList = this.renderArticlesList.bind(this);
        this.loadNextArticles = this.loadNextArticles.bind(this);
        this.renderdetailedView = this.renderdetailedView.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }

    componentDidMount() {
        this.loadNextArticles();
    }

    loadNextArticles() {
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

    sendComment(id, comment) {
        return provider.addComment(id, comment).then((result) => {
            const { articles } = this.state;

            const updatedArticles = articles.map((art) => {
                if (art.id == result.data.articleId) {
                    art.commentsCount = +art.commentsCount + 1;
                }

                return art;
            });

            this.setState({
                articles: updatedArticles
            });

            return result;
        });
    }

    renderArticlesList(articles) {
        return (<ul className={'articles-list'}>
            {articles.map((art) => {
                return (<li key={art.id} className={'articles-list__item'}>
                    <ArticleShortView {...art} />
                </li>);
            })}
        </ul>);
    }

    renderdetailedView(articles, articleId) {
        const article = articles.find((art) => art.id == articleId);

        return (
            <ArticleDetailedView article={article} sendComment={this.sendComment} />
        );
    }

    render() {
        const { articles, articlesTotalCount } = this.state;
        const { articleId } = this.props.params;

        return (
            <main>
                <aside className={'articles-container'}>
                    <div className={'aside-title-container'}>
                        <h1>Articles List</h1>
                    </div>
                    {this.renderArticlesList(articles)}
                    <div className={'button-container-center-align'}>
                        {articles.length != articlesTotalCount && <button onClick={this.loadNextArticles} className={'load-next-button'}>Load Next</button>}
                    </div>
                </aside>
                <article className={'article-detailed-view-container'}>
                    {articleId && articles.length > 0 && this.renderdetailedView(articles, articleId)}
                </article>
            </main>

        );
    }
}

ArticlesPage.propTypes = {
    params: PropTypes.shape({
        articleId: PropTypes.string,
    })
};

export default ArticlesPage;
