import React, { Component } from 'react';
import PropTypes from 'prop-types';

import provider from '../../providers/provider';

class ArticlesPage extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {
        provider.getArticles().then((result) => console.log(result));
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <h1>app work....</h1>
            </div>
        );
    }
}

ArticlesPage.propTypes = {

};

export default ArticlesPage;
