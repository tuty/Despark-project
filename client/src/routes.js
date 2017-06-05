import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import ArticlesPage from './components/ArticlesPage/ArticlesPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={ArticlesPage} />
        <Route path="articles/:articleId" component={ArticlesPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);
