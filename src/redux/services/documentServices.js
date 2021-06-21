import {
    //my documents
    get_MyDocumentsRequest,
    get_MyDocumentsSuccess,
    get_MyDocumentsFailure,

    //my documents
    get_PendingDocumentsRequest,
    get_PendingDocumentsSuccess,
    get_PendingDocumentsFailure,

    //document search result
    get_DocumentSearchRequest,
    get_DocumentSearchSuccess,
    get_DocumentSearchFailure,

    post_UploadDocumentRequest,
    post_UploadDocumentSuccess,
    post_UploadDocumentFailure,
    post_ReactionADocumentRequest,
    post_ReactionADocumentSuccess,
    post_ReactionADocumentFailure,

    get_ReportedDocumentsSuccess,
    get_ReportedDocumentsRequest,
    get_ReportedDocumentsFailure,
    post_ApproveADocumentReset,
    post_ApproveADocumentSuccess,
    post_ApproveADocumentFailure,
    delete_RejectADocumentReset,
    delete_RejectADocumentSuccess,
    delete_RejectADocumentFailure,
    post_ResolveADocumentReset,
    post_ResolveADocumentSuccess,
    post_ResolveADocumentFailure,
    delete_ADocumentReset,
    delete_ADocumentSuccess,
    delete_ADocumentFailure,
    put_EditADocumentReset,
    put_EditADocumentSuccess,
    put_EditADocumentFailure,
    post_ReportADocumentReset,
    post_ReportADocumentSuccess,
    post_ReportADocumentFailure,
    get_DocumentByIDReset,
    // get_DocumentByIDSuccess,
    // get_DocumentByIDFailure,
    get_ManagementDocumentsRequest,
    get_ManagementDocumentsSuccess,
    get_ManagementDocumentsFailure,
    get_DocumentByIDSuccess,
    get_DocumentByIDFailure,
} from "redux/actions/documentAction.js";
import FormData from 'form-data';
import { generateSearchParam } from 'utils/urlUtils';
import { openModal, openBLModal, closeModal } from 'redux/services/modalServices'

//upload new document

import { request, multipartRequest, authRequest } from 'utils/requestUtils'
import { getUserStatisticById } from "./authServices";

export function getNotApprovedDocumentsList() {
    return dispatch => {
    }
}

export function getManagementDocuments(searchParamObject) {
    return dispatch => {
        dispatch(get_ManagementDocumentsRequest());
        request.get(`/documents/getManagementDoc?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                response.data.docSummaryWithStateDTOs.docSummary.map(item => IDarr += item.id + ",") //tao ra mang id moi
                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docSummary.length; i++) {
                            finalResult.push({
                                ...result_1.docSummary[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docSummary[i].id)),
                            }
                            );
                        }

                        dispatch(get_ManagementDocumentsSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_ManagementDocumentsFailure())
            })
            .catch(error => {
                dispatch(get_ManagementDocumentsFailure(error))
            })
    }
}

export function getDocumentSearch(searchParamObject) {
    return dispatch => {
        dispatch(get_DocumentSearchRequest());
        request.get(`/documents?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                response.data.docSummaryDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi
                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docSummaryDTOs.length; i++) {
                            finalResult.push({
                                ...result_1.docSummaryDTOs[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docSummaryDTOs[i].id)),
                            }
                            );
                        }

                        dispatch(get_DocumentSearchSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_DocumentSearchFailure())
            })
            .catch(error => {
                dispatch(get_DocumentSearchFailure(error))
            })
    }
}

export function getPendingDocuments(searchParamObject) {
    return dispatch => {
        dispatch(get_PendingDocumentsRequest());
        request.get(`/documents?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                // response.data.docDetails.map(item => IDarr += item.id + ",") //tao ra mang id moi
                IDarr = "1,151";
                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docDetails.length; i++) {
                            finalResult.push({
                                ...result_1.docDetails[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docDetails[i].id)),
                            }
                            );
                        }

                        dispatch(get_PendingDocumentsSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_PendingDocumentsFailure())
                // dispatch(get_MyDocumentsSuccess({ docSummaryWithStateDTOs: response.data.docDetails, totalPages: response.data.totalPages, totalElements: response.data.totalElements }))
            })
            .catch(error => {
                dispatch(get_PendingDocumentsFailure(error))
            })
    }
}

export function getReportedDocuments(searchParamObject) {
    return dispatch => {
        dispatch(get_ReportedDocumentsRequest());
        request.get(`/documents?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                // response.data.docDetails.map(item => IDarr += item.id + ",") //tao ra mang id moi
                IDarr = "1,151";
                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docDetails.length; i++) {
                            finalResult.push({
                                ...result_1.docDetails[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docDetails[i].id)),
                            }
                            );
                        }

                        dispatch(get_ReportedDocumentsSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_ReportedDocumentsFailure())
                // dispatch(get_MyDocumentsSuccess({ docSummaryWithStateDTOs: response.data.docDetails, totalPages: response.data.totalPages, totalElements: response.data.totalElements }))
            })
            .catch(error => {
                dispatch(get_PendingDocumentsFailure(error))
            })
    }
}

export function getMyDocuments(searchParamObject) { //this API to get all approved document of a specific user.
    return dispatch => {
        dispatch(get_MyDocumentsRequest());
        request.get(`/documents/myDocuments?${generateSearchParam(searchParamObject)}`) //api chua dung, chua co API cho my Documents
            .then(response => {
                //statistic
                let result_1 = response.data;
                let IDarr = '';
                response.data.docDetails.map(item => IDarr += item.id + ",") //tao ra mang id moi
                request.get(`/documents/statistics?docIDs=${IDarr}`)
                    .then(result => {
                        //merge summary array and statistic array
                        let finalResult = [];
                        for (let i = 0; i < result_1.docDetails.length; i++) {
                            finalResult.push({
                                ...result_1.docDetails[i],
                                ...(result.data.find((itmInner) => itmInner.docID === result_1.docDetails[i].id)),
                            });
                        }
                        dispatch(get_MyDocumentsSuccess({ docSummaryWithStateDTOs: finalResult, totalPages: result_1.totalPages, totalElements: result_1.totalElements }))
                    }).catch(() => get_MyDocumentsFailure())
            })
            .catch(error => {
                dispatch(get_MyDocumentsFailure(error))
            })
    }
}

export function uploadADocument(data, files) {
    return dispatch => {
        dispatch(post_UploadDocumentRequest());
        openModal("loader", { text: "Đang upload tài liệu " });

        let fileData = new FormData();
        // files.forEach(file => {
        fileData.append('file', files);

        multipartRequest.document(`/documents/upload`, fileData)
            .then(response => {
                data.fileCode = response.data.code; //assign secret code.
                request.document('/documents', JSON.stringify(data)).then(response => {
                    dispatch(post_UploadDocumentSuccess(response));
                    dispatch(closeModal());
                    openBLModal({ type: "success", text: "Tài liệu được tạo thành công!" });
                }).catch(error => {
                    dispatch(post_UploadDocumentFailure(error));
                })
            }).catch(error => {
                dispatch(post_UploadDocumentFailure(error));
            })
    }
}

export function reactionADocument(docID, reactionType) {
    return dispatch => {
        dispatch(post_ReactionADocumentRequest());
        request.put("/documents/reactions", JSON.stringify({ docID: docID, docReactionType: reactionType }))
            .then(response => {
                openBLModal({ type: "success", text: "Cảm ơn bạn đã đưa cảm nhận về tài liệu!" });
                dispatch(post_ReactionADocumentSuccess(response))
            })
            .catch(error => {
                dispatch(post_ReactionADocumentFailure(error));
            })
    }
}

export function getDocumentByID(id) {
    return dispatch => {
        dispatch(get_DocumentByIDReset())
        authRequest.get(`/documents/${id}`)
            .then(response_1 => {
                let result_1 = response_1.data;//response without statistic

                //get relative documents
                // dispatch(getSameAuthorDocuments(result_1.id, result_1.authorID));
                // dispatch(getSameCategoryDocuments(result_1.id, result_1.categoryID));

                //get user statistic
                dispatch(getUserStatisticById(result_1.authorID));
                authRequest.get(`/documents/statistics?docIDs=${result_1.id}`)
                    .then(response_2 => {
                        // authRequest.get(`/documents/actionAvailable?documentIDs=${result_1.id}`).then(response_3 => {
                        dispatch(get_DocumentByIDSuccess({
                            ...result_1, ...response_2.data[0],
                            //  ...response_3.data[0]
                        })
                            // )}).catch(error => { dispatch(get_DocumentByIDFailure(error)) }
                        ).catch(error => { dispatch(get_DocumentByIDFailure(error)) })
                    }).catch(error => { dispatch(get_DocumentByIDFailure(error)) })
            })
    }
}

export function approveADocument(id) {
    return dispatch => {
        dispatch(post_ApproveADocumentReset());
        request.document(`/documents/${id}/approval`)
            .then(result => {
                dispatch(post_ApproveADocumentSuccess());
            })
            .catch(error => post_ApproveADocumentFailure())
    }
}

export function rejectADocument(id) {
    return dispatch => {
        dispatch(delete_RejectADocumentReset());
        request.delete(`/documents/${id}/approval`)
            .then(result => {
                dispatch(delete_RejectADocumentSuccess());
            })
            .catch(error => delete_RejectADocumentFailure())
    }
}

export function rejectAndFeedbackADocument(id, reason) { //
    return dispatch => {
        dispatch(closeModal());
        openModal("loader", { text: "Đang xử lý" })
        request.document(`/documents/${id}/rejection`, JSON.stringify(reason))
            .then(response => {
                dispatch(closeModal());
                //             dispatch(post_RejectAndFeedbackADocumentSuccess());
                dispatch(closeModal());
                openBLModal({ text: "Từ chối tài liệu thành công!", type: "success" });

            }
            ).catch(() => {
                // dispatch(post_RejectAndFeedbackADocumentFailure())
            }
            )
    }
}

export function resolveADocument(id, resolveDTO) {
    return dispatch => {
        dispatch(post_ResolveADocumentReset());
        request.document(`/documents/resolveReport/${id}`, JSON.stringify(resolveDTO))
            .then(result => {
                dispatch(post_ResolveADocumentSuccess());
            })
            .catch(error => post_ResolveADocumentFailure())
    }
}


//chua co API cho viec xoa bai document
export function deleteADocument(id) { //maybe use modal later
    return dispatch => {
        dispatch(delete_ADocumentReset(id))
        request.delete(`/documents/${id}`).then(response => {
            dispatch(delete_ADocumentSuccess())
            openBLModal({ text: "Xoá tài liệu thành công!", type: "success" });

        }).catch(error => { dispatch(delete_ADocumentFailure(id)) })
    }
}

export function editADocument(id, newDocumentContent, reloadList) { //
    return dispatch => {
        dispatch(put_EditADocumentReset())
        openModal("loader", { text: "Đang xử lý" });
        request.put(`/documents/${id}`, JSON.stringify(newDocumentContent))
            .then(response => {
                dispatch(closeModal());
                openBLModal({ text: "Chỉnh sửa tài liệu thành công!", type: "success" });
                dispatch(put_EditADocumentSuccess(id, newDocumentContent));
            }
            ).catch(() => dispatch(put_EditADocumentFailure()))
    }
}

export function reportADocument(id, reason) { //
    return dispatch => {
        dispatch(post_ReportADocumentReset())
        request.document(`/documents/${id}/report`, JSON.stringify(reason))
            .then(response => {
                dispatch(post_ReportADocumentSuccess());
            }
            ).catch(() => dispatch(post_ReportADocumentFailure()))
    }
}