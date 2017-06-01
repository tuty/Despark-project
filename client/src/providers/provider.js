import * as api from '../fakeApi';

export default {

    getArticles() {
        return api.loadArticles();
    },

    getSliceOfArticles(offset, limit) {
        return api.loadArticles({ offset, limit});
    },

    getComments(articleId) {
        return 	api.loadComments({ articleId });
    },

    getReplies(parentCommentId) {
        return api.loadComments({ parentCommentId });
    },

    addComment(articleId, text) {
        return api.addComment({ articleId, text });
    },

    addReply(parentCommentId, text) {
        return api.addComment({ parentCommentId, text });
    }
};
