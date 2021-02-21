import React, { Component } from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { approveAPost } from 'redux/services/postServices'
//resources
import gray_btn_element from 'assets/icons/24x24/gray_btn_element_24x24.png'
import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import edit_icon from 'assets/icons/24x24/nb_gray_write_icon_24x24.png'
import report_icon from 'assets/icons/24x24/report_icon_24x24.png'
import { deleteAPost, editAPost } from 'redux/services/postServices'
// import 'components/styles/Metadata.scss'
import 'components/styles/Metadata.scss'

//styles
import 'components/styles/Label.scss'

//constants
import { itemType } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

class PostSummary extends Component {

  constructor(props) {
    super(props);
    this.normalMenuItemList = [
      { id: 3, name: "Báo cáo", icon: report_icon },
    ]

    this.mySelfMenuItemList = [
      { id: 1, text: "Xoá", value: "DELETE_POST", icon: trash_icon, tip: "Không cần duyệt.", hasLine: true },
      { id: 2, text: "Chỉnh sửa", value: "EDIT_POST", icon: edit_icon, tip: "Cần chờ kiểm duyệt." },
      { id: 3, text: "Báo cáo", value: "REPORT_POST", icon: report_icon },
    ]

    this.id = this.props.id;
    this.title = this.props.title;
    this.image = this.props.image;

  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_POST") {
      this.props.deleteAPost(this.props.id);
    }
  }

  render() {
    let approveLabel = <></>;
    //#endregion
    if (this.props.approveState === "PENDING_APPROVAL")
      approveLabel = <div className="d-flex" >
        <div className="light-black-label"> - </div>
        <div className="red-border-label">PENDING</div>
      </div >
    else if (this.props.approveState === "PENDING_FIX")
      approveLabel = <div className="d-flex">
        <div className="light-black-label"> - </div>
        <div className="blue-border-label">PENDING</div>
      </div>
    else if (this.props.approveState === "REJECTED")
      approveLabel = <div className="d-flex">
        <div className="light-black-label"> - </div>
        <div className="red-border-label">REJECTED</div>
      </div>
    else if (this.props.approveState === "APPROVED")
      approveLabel = <div className="d-flex">
        <div className="light-black-label"> - </div>
        <div className="blue-border-label">APPROVED</div>
      </div>

    return (
      <div className="metadata">
        <div className="j-c-space-between"  >
          <div className="d-flex">
            <div className="d-flex">
              <div className="category">
                {this.props.categoryName}
              </div>
            </div>
            <div className="light-black-label">bởi</div>
            <Link className="link-label" to={/user/}>
              {this.props.authorName}
            </Link>

            {this.props.type === itemType.mySelf || this.props.type === itemType.approving ?
              <>{approveLabel}</> : <></>}
          </div>

          {this.props.type === itemType.mySelf &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={this.mySelfMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} /> //stand for post item poupup menu
          }
          {(this.props.type === itemType.normal || !this.props.type) &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={this.normalMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} />
          }
        </div>

        {/* title */}
        <div className="d-flex mg-top-5px">
          {/* fake avatar */}
          <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: "#c4c4c4", marginTop: "2px" }}></div>
          <div className="mg-left-5px j-c-space-between d-flex-vertical">
            <Link to={"/posts/" + this.id}>
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
                <div className="metadata-label" style={{ marginLeft: "2px" }}>
                  {this.props.publishDtm.substring(0, 10)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-text">
          {this.props.summary}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  approveAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSummary));
