
import {
    get_TrendingDocumentsRequest,
    get_TrendingDocumentsSuccess,
    get_TrendingDocumentsFailure,

    get_HighlightPostsRequest,
    get_HighlightPostsSuccess,
    get_HighlightPostsFailure,

    get_NewestPostsRequest,
    get_NewestPostsSuccess,
    get_NewestPostsFailure,

    get_NewestActivitiesRequest,
    get_NewestActivitiesSuccess,
    get_NewestActivitiesFailure,

    highlight_APostReset,
    highlight_APostSuccess,
    highlight_APostFailure,

    delete_HighlightAPostReset,
    delete_HighlightAPostSuccess,
    delete_HighlightAPostFailure,

    get_HighlightPostsIdsRequest,
    get_HighlightPostsIdsSuccess,
    get_HighlightPostsIdsFailure,

    stick_APostToTopReset,
    stick_APostToTopSuccess,
    stick_APostToTopFailure

} from "redux/actions/homeAction.js";
import { request } from 'utils/requestUtils'
import { openBLModal } from "./modalServices";
import done_icon from 'assets/icons/24x24/done_icon_24x24.png';

export function getTrendingDocuments() {
    return dispatch => {
        dispatch(get_TrendingDocumentsRequest());
        request.get(`/documents/trending`).then(
            response => {
                let result_1 = response.data;
                let IDarr = '';
                response.data.map(item => IDarr += item.id + ","); //create id array

                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        let finalResult = [];

                        for (let i = 0; i < result_1.length; i++) {
                            finalResult.push({
                                ...result_1[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1[i].id)),
                            }
                            );
                        }
                        dispatch(get_TrendingDocumentsSuccess(finalResult))
                    }).catch(error => dispatch(get_TrendingDocumentsFailure(error)))
            }
        )
            .catch(error => {
                dispatch(get_TrendingDocumentsFailure(error)); //
            })
    }
}

export function getNewestPosts() {
    return dispatch => {
        dispatch(get_NewestPostsRequest());
        request.get(`/posts/newest`).then(
            response => {

                let result_1 = response.data;
                let IDarr = '';
                response.data.map(item => IDarr += item.id + ","); //create id array

                request.get(`/posts/statistic?postIDs=${IDarr}`)
                    .then(result => {
                        let finalResult = [];

                        for (let i = 0; i < result_1.length; i++) {
                            finalResult.push({
                                ...result_1[i],
                                ...(result.data.find((itmInner) => itmInner.id === result_1[i].id)),
                            }
                            );
                        }
                        dispatch(get_NewestPostsSuccess(finalResult))
                    }).catch(error => dispatch(get_NewestPostsFailure(error)))
            }
        )
            .catch(error => {
                dispatch(get_NewestPostsFailure(error)); //
            })
    }
}

//highlight post
export function getHighlightPosts() {
    return dispatch => {
        dispatch(get_HighlightPostsRequest());
        request.get(`/posts/highlightPosts`)
            .then(response => {
                let result_1 = response.data;
                let IDarr = ''; response.data.map(item => IDarr += item.postSummaryDTO.id + ",")
                request.get(`/posts/statistic?postIDs=${IDarr}`)
                    .then(result => {
                        let finalResult = [];
                        for (let i = 0; i < result_1.length; i++) {

                            finalResult.push({
                                ...result_1[i],
                                ...result_1[i].postSummaryDTO,
                                ...(result.data.find((itmInner) => itmInner.id === result_1[i].postSummaryDTO.id)),
                            }
                            );
                        }

                        dispatch(get_HighlightPostsSuccess(finalResult))
                    }).catch(error => dispatch(get_HighlightPostsFailure(error)))
            }
            )
            .catch(error => {
                dispatch(get_HighlightPostsFailure(error)); //
            })
    }
}


export function getNewestActivities() {
    return dispatch => {
        dispatch(get_NewestActivitiesRequest());
        request.get(`/posts/newactivities`)
            .then(response => {
                let result_1 = response.data;
                let IDarr = ''; response.data.map(item => IDarr += item.id + ",")
                request.get(`/posts/statistic?postIDs=${IDarr}`)
                    .then(result => {
                        let finalResult = [];

                        for (let i = 0; i < result_1.length; i++) {
                            finalResult.push({
                                ...result_1[i],
                                ...(result.data.find((itmInner) => itmInner.id === result_1[i].id)),
                            }
                            );
                        }
                        dispatch(get_NewestActivitiesSuccess(finalResult))
                    }).catch(error => dispatch(get_NewestActivitiesFailure(error)))
            }
            )
            .catch(error => {
                dispatch(get_NewestActivitiesFailure(error)); //
            })
    }
}

export function highlightAPost(id) {
    return dispatch => {
        let tmp = { postId: id };
        dispatch(highlight_APostReset());
        request.post('/posts/highlightPosts', JSON.stringify(tmp))
            .then(response => {
                dispatch(highlight_APostSuccess(response.data))
            }).catch(error => { dispatch(highlight_APostFailure()) })
    }
}

export function deleteHighlightAPost(id) {
    return dispatch => {
        dispatch(delete_HighlightAPostReset());
        request.delete(`/posts/highlightPosts?id=${id}`)
            .then(response => {
                dispatch(delete_HighlightAPostSuccess(response.data));
            }).catch(error => { dispatch(highlight_APostFailure()) })
    }
}


export function stickAPostToTop(id) {
    return dispatch => {
        dispatch(stick_APostToTopReset());
        request.post(`/posts/highlightPosts/stickToTop?id=${id}`)
            .then(response => {
                openBLModal({ icon: done_icon, text: "Bài viết đã được ghim lên đầu!" })
                dispatch(stick_APostToTopSuccess(response.data));
            }).catch(error => { dispatch(stick_APostToTopFailure(error)) })
    }
}