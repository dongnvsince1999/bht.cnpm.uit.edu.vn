/* eslint-disable react/jsx-pascal-case */
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React from 'react'

//services
import { getExerciseSearch } from "redux/services/courseServices"
import { getExerciseCategoriesHaveAll } from "redux/services/exerciseCategoryServices";

import { getSubjectsListHaveAll } from "redux/services/subjectServices"

//utils
import { getQueryParamByName, setQueryParam } from 'utils/urlUtils'

//components
import Paginator from 'components/common/Paginator/ServerPaginator';
import ComboBox from 'components/common/Combobox/Combobox';
import { DocPostSummaryLoader } from 'components/common/Loader/DocPostSummaryLoader'
import SummaryMetadata from 'components/course/SummaryInfo'
import { itemType } from 'constants.js';
import SearchHorizontalMenubar from './SearchHorizontalMenubar';
import Loader from 'components/common/Loader/Loader';

class ExercisesList extends React.Component {

    componentDidMount() {
        this.queryParamObject = {
            "category": getQueryParamByName('category') ? getQueryParamByName('category') : 0,
            "page": 1,
            "tab": 'REVELANT',
            "q": getQueryParamByName('q') ? getQueryParamByName('q') : '',
            'subject': getQueryParamByName('subject') ? getQueryParamByName('subject') : 0
        }

        this.searchParamObject = {
            "page": 1,
            "categoryID": getQueryParamByName('category') ? getQueryParamByName('category') : 0,
            "searchTerm": getQueryParamByName('q') ? getQueryParamByName('q') : '',
            'subjectID': getQueryParamByName('subject') ? getQueryParamByName('subject') : 0
        }

        //force default properties, can't access by querry param
        setQueryParam(this.queryParamObject);
        this.props.getExerciseCategoriesHaveAll();
        this.props.getSubjectsListHaveAll();
        this.props.getExerciseSearch(this.searchParamObject);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        this.queryParamObject = {
            ...this.queryParamObject,
            "page": pageNumber
        }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            paginator: getQueryParamByName('page')
        }
        this.props.getExerciseSearch(this.searchParamObject);
        this.setState({});
    }

    //combobox
    onCategoryOptionChange = (selectedOption) => {
        this.queryParamObject = { ...this.queryParamObject, category: selectedOption.id, page: 1 }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            "categoryID": selectedOption.id,
            searchTerm: getQueryParamByName('q'),
            page: 1
        }
        this.props.getExerciseSearch(this.searchParamObject);
        this.setState({});
    }

    onSubjectOptionChange = (selectedOption) => {
        this.queryParamObject = {
            ...this.queryParamObject,
            subject: selectedOption.id,
            page: 1,
            q: getQueryParamByName("q")
        }
        setQueryParam(this.queryParamObject);
        this.searchParamObject = {
            ...this.searchParamObject,
            searchTerm: getQueryParamByName('q'),
            "subjectID": selectedOption.id, // => change subject
            page: 1
        }
        this.props.getExerciseSearch(this.searchParamObject);
        this.setState({});

    }

    onFilterClick = (filter) => {
        switch (filter) {
            case "HOT": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    "page": 1,
                    tab: "HOT",
                    category: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    subject: getQueryParamByName('subject') ? getQueryParamByName('subject') : 0,
                    q: getQueryParamByName("q"),

                }
                setQueryParam(this.queryParamObject);
                this.searchParamObject = {
                    "page": 1,
                    "searchTerm": getQueryParamByName("q"),
                    "advancedSort": "HOT",
                    categoryID: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    subjectID: getQueryParamByName('subject') ? getQueryParamByName('subject') : 0,

                }
                this.props.getExerciseSearch(this.searchParamObject)
                this.setState({});
                return;
            }
            case "BEST": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    "page": 1,
                    category: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    subject: getQueryParamByName('subject') ? getQueryParamByName('subject') : 0,
                    tab: "BEST",
                    q: getQueryParamByName("q"),

                }
                setQueryParam(this.queryParamObject);
                this.searchParamObject = {
                    "page": 1,
                    "searchTerm": getQueryParamByName("q"),
                    "advancedSort": "BEST",
                    categoryID: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    subjectID: getQueryParamByName('subject') ? getQueryParamByName('subject') : 0,

                }
                this.props.getExerciseSearch(this.searchParamObject)
                this.setState({});
                return;
            }
            case "NEWEST": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    "page": 1,
                    category: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    subject: getQueryParamByName('subject') ? getQueryParamByName('subject') : 0,
                    tab: "NEWEST",
                    q: getQueryParamByName("q"),

                }
                setQueryParam(this.queryParamObject);
                this.searchParamObject = {
                    "page": 1,
                    "searchTerm": getQueryParamByName("q"),
                    sortByAttempts: null,
                    sortByPublishDtm: "DESC",
                    categoryID: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    subjectID: getQueryParamByName('subject') ? getQueryParamByName('subject') : 0,

                }
                this.props.getExerciseSearch(this.searchParamObject)
                this.setState({});
                return;
            }
            case "TOP": {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    page: 1,
                    tab: "TOP",
                    category: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    subject: getQueryParamByName('subject') ? getQueryParamByName('subject') : 0,
                    q: getQueryParamByName("q"),

                }
                setQueryParam(this.queryParamObject);
                this.searchParamObject = {
                    "page": 1,
                    "searchTerm": getQueryParamByName("q"),
                    sortByAttempts: "DESC",
                    sortByPublishDtm: null,
                    categoryID: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    subjectID: getQueryParamByName('subject') ? getQueryParamByName('subject') : 0,

                }
                this.props.getExerciseSearch(this.searchParamObject);
                this.setState({});
                return;
            }
            default: {
                this.queryParamObject = {
                    ...this.queryParamObject,
                    page: 1,
                    q: getQueryParamByName("q") ? getQueryParamByName("q") : '',
                    tab: "REVELANT",
                    category: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    subject: getQueryParamByName('subject') ? getQueryParamByName('subject') : 0,
                }
                this.searchParamObject = {
                    ...this.searchParamObject,
                    sortByAttempts: null,
                    sortByPublishDtm: null,
                    "searchTerm": getQueryParamByName("q"),
                    categoryID: getQueryParamByName('category') ? getQueryParamByName('category') : 0,
                    subjectID: getQueryParamByName('subject') ? getQueryParamByName('subject') : 0,
                    "page": 1,
                }
                setQueryParam(this.queryParamObject);
                this.props.getExerciseSearch(this.searchParamObject);
                this.setState({});
                return;
            }
        }
    }

    render() {

        if (!this.props.isCategoryLoading && this.props.categories.length > 1 && !this.props.isSubjectLoading && this.props.subjects.length > 1) {
            this.comboboxGroup = <div style={{ marginTop: "20px" }}>
                <div className="j-c-space-between">
                    <div></div>
                    <div className="r-h-filter-c" style={{ marginTop: "-33px" }}>
                        <div className="h-filter">
                            <div className={!getQueryParamByName("tab") ||
                                (getQueryParamByName("tab") !== "TOP"
                                    && getQueryParamByName("tab") !== "NEWEST"
                                )
                                ? "h-filter-item active first" : "h-filter-item first"}
                                onClick={() => this.onFilterClick("REVELANT")}
                            > Liên quan</div>

                            <div className={getQueryParamByName("tab") === "NEWEST"
                                ? "h-filter-item active" : "h-filter-item"}
                                onClick={() => this.onFilterClick("NEWEST")}
                            >Mới nhất</div>

                            <div className={getQueryParamByName("tab") === "TOP"
                                ? "h-filter-item last active" : "h-filter-item last"}
                                onClick={() => this.onFilterClick("TOP")}
                            >Lượt giải</div>
                        </div>
                    </div>
                </div>

                <div className="d-flex" style={{ marginTop: "30px" }}>
                    <div className="d-flex">
                        <div className="filter-label t-a-right mg-right-5px">Danh mục:</div>
                        <div className="mg-left-5px">
                            <ComboBox
                                selectedOptionID={getQueryParamByName('category') ? getQueryParamByName('category') : 0}
                                options={this.props.categories}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChange(selectedOption)}
                                comboboxId="my-document-list-category-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                    <div className="d-flex" style={{ marginLeft: "10px" }}>
                        <div className="filter-label t-a-right mg-right-5px">Môn học: </div>
                        <div className="mg-left-5px">
                            <ComboBox
                                selectedOptionID={getQueryParamByName('subject') ? getQueryParamByName('subject') : 0}
                                options={this.props.subjects}
                                placeHolder="Tất cả"
                                onOptionChanged={(selectedOption) => this.onSubjectOptionChange(selectedOption)}
                                comboboxId="my-document-list-subject-filter-combobox"
                            ></ComboBox>
                        </div>
                    </div>
                </div>

            </div >

        }

        else this.comboboxGroup = <div className="filter-container j-c-space-between ">
            <div className="d-flex">
                <div className="timeline-item d-flex">
                    <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
                </div>
            </div>
            <div className="timeline-item d-flex">
                <div className="animated-background" style={{ width: "240px", height: "20px" }}></div>
            </div>
        </div>

        if (!this.props.isListLoading) {
            if (this.props.exercisesList.length !== 0)
                this.exercisesList = this.props.exercisesList.map((item) => {
                    return <div className="item-container" key={item.id}>
                        <SummaryMetadata
                            type={itemType.normal}
                            exerciseID={item.id}
                            authorDisplayName={item.author.displayName}
                            authorID={item.author.authorID}
                            publishDtm={item.publishDtm}
                            categoryName={item.category.name}
                            categoryID={item.category.id}
                            subjectName={item.subject.name}
                            subjectID={item.subject.id}
                            title={item.title}
                            description={item.description}
                            popUpMenuPrefix="sepu"   //stand for search exercises popup 
                            authorAvatarURL={item.author.avatarURL}
                            reloadList={() => this.reloadList()}
                        />
                    </div >
                })
            else
                this.exercisesList = <div>Không có kết quả nào!</div>;
        }

        else
            this.exercisesList = <div>
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
                {DocPostSummaryLoader()}
            </div>

        return (
            <div className="search-layout">
                <SearchHorizontalMenubar></SearchHorizontalMenubar>
                <div className="mg-top-10px" />
                <div className="nm-bl-layout-router-outlet" >
                    <div>
                        <div className="filter-container" >
                            {this.comboboxGroup}
                            {this.subjectCombobox}
                        </div>
                        {this.props.isListLoading ?
                            < Loader /> :
                            <div>
                                <div className="gray-label" style={{ marginBottom: "20px" }}> Tổng số kết quả: {this.props.totalElements}  </div>
                                <div >{this.exercisesList}</div>

                                < Paginator config={{
                                    changePage: (pageNumber) => this.onPageChange(pageNumber),
                                    pageCount: this.props.totalPages,
                                    currentPage: getQueryParamByName('page') ? getQueryParamByName('page') : 1
                                }} />
                            </div>
                        }
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {

    return {
        exercisesList: state.course.exercisesList.data,
        isListLoading: state.course.exercisesList.isLoading,

        //category
        isCategoryLoading: state.exerciseCategory.categories.isLoading,
        categories: state.exerciseCategory.categories.searchData,

        //pages and elements
        totalPages: state.course.exercisesList.totalPages,
        totalElements: state.course.exercisesList.totalElements,

        //subject
        isSubjectLoading: state.subject.subjects.isLoading,
        subjects: state.subject.subjects.searchData

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getExerciseSearch,
    getExerciseCategoriesHaveAll,
    getSubjectsListHaveAll
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExercisesList));
