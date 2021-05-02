import React, { Component } from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources

import { openBigModal, openModal, closeModal, openBLModal } from 'redux/services/modalServices'
import { post_ReportAPostReset } from 'redux/actions/postAction'
import store from 'redux/store/index'
import { validation } from 'utils/validationUtils'
import {
  mySelfMenuItemList,
  unHighlightAdminMenuItemList
} from 'constants.js'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//constants
import { itemType } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

class Comment extends Component {

  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.title = this.props.title;
    this.image = this.props.image;
  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_POST") {
      //show confirmation popup and detete id verify
      openModal("confirmation",
        {
          title: "Xoá bài viết",
          text: "Hành động này không cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => {
            this.props.deleteAPost(this.props.id);
            closeModal();
          }
        })
    }

    if (selectedItem.value === "EDIT_POST") {
      openBigModal("edit-post", { id: this.props.id });
    }

    if (selectedItem.value === "REPORT_POST") {
      openModal("form", {
        id: `rpp-form-modal`,//report post
        title: `REPORT BÀI VIẾT`,
        formId: `rpp-form`,
        inputs:
          [
            { //for rendering
              id: `rpp-form-input`,
              isRequired: true,
              label: "Lý do tố cáo:",
              type: 'text-area',
              placeHolder: "Nhập lý do tố cáo ",
              validation: true,
              key: "reason"
            },
          ],
        append: { id: this.props.id },
        validationCondition: {
          form: `#rpp-form`,
          rules: [
            //truyen vao id, loai component, message
            validation.isRequired(`rpp-form-input`, 'text-area', 'Lý do không được để trống!'),
            validation.minLength(`rpp-form-input`, 'text-area', 25, 'Lý do không được nhỏ hơn 25 ký tự!')
          ],

        },
        submitText: "Report",
        cancelText: "Huỷ",
        confirmBox: {
          title: "Report bài viết",
          text: "Bạn có chắc chắn muốn tố cáo bài viết này không?",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: DTO => this.onConfirmReport(DTO)
        }
      });
    }

    if (selectedItem.value === "HIGHLIGHT_POST") {
      openModal("confirmation", {
        title: "Ghim bài viết",
        text: "Xác nhận ghim bài viết?",
        onConfirm: () => {
          this.props.highlightAPost(this.props.id);
          closeModal();
        }
      });
    }

    if (selectedItem.value === "UNHIGHLIGHT_POST") {
      openModal("confirmation", {
        title: "Bỏ ghim bài viết",
        text: "Xác nhận bỏ ghim bài viết?",
        onConfirm: () => {
          this.props.deleteHighlightAPost(this.props.id);
          closeModal();
        }
      });
    }

    if (selectedItem.value === "STICK_TO_TOP_POST") {
      openModal("confirmation", {
        title: "Ghim bài viết lên đầu",
        text: "Xác nhận ghim bài viết lên đâu?",
        onConfirm: () => {
          this.props.stickAPostToTop(this.props.id);
          closeModal();
        }
      });
    }
  }

  onConfirmReport = (DTO) => {
    closeModal();
    closeModal();
    this.props.reportAPost(DTO.id, { "reason": DTO.reason });
  }

  render() {

    //only set for report.
    if (this.props.isHaveReported) {
      openBLModal({ text: "Report bài viết thành công!", type: "success" });
      store.dispatch(post_ReportAPostReset())
    }

    return (
      <div className="metadata" >
        <div className="j-c-space-between"  >
          <div className="d-flex">
            <div className="d-flex">
              <div className="category">
                {this.props.categoryName}
              </div>
            </div>
            <div className="light-black-label">bởi</div>
            <Link className="link-label-s" to={/user/}>
              {this.props.authorName}
            </Link>

          </div>
          {this.props.type === itemType.mySelf &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={mySelfMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} /> //stand for post item poupup menu
          }
          {this.props.type === itemType.management && this.props.isHighlighted &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={unHighlightAdminMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} /> //stand for post item poupup menu
          }
        </div>

        {/* title */}
        <div className="d-flex mg-top-5px" >
          {/* fake avatar */}
          < img className="avatar" src={this.props.authorAvatarURL} alt="" />
          <div className="mg-left-5px j-c-space-between d-flex-vertical">
            <Link to={"/post-content/" + this.props.id}>
              <div className="title">
                {this.props.title}
              </div>
            </Link>

            <div className="d-flex" style={{ marginTop: "-5px" }}>
              <div className="d-flex"  >
                <div className="metadata-label" style={{ marginLeft: "2px" }}>
                  {Math.ceil(this.props.readingTime / 60) + " phút đọc"}
                </div>
              </div>

              <div className="d-flex" >
                {this.props.publishDtm ?
                  <div className="metadata-label" style={{ marginLeft: "2px" }}>
                    {this.props.publishDtm.substring(0, 10)}
                  </div>
                  : <></>}
              </div>
            </div>
          </div>
        </div>

      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //report
    // isHaveReported: state.post.isHaveReported
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));
