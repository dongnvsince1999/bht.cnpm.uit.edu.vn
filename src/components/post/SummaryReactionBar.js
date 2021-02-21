import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { likeAPost, unLikeAPost, saveAPost, unSaveAPost } from 'redux/services/postServices';

//resources
import liked_icon from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_icon from 'assets/icons/24x24/unliked_icon_24x24.png'
import full_blue_bookmark_btn from 'assets/icons/24x24/b_blue_bookmark_icon_24x24.png'
import gray_bookmark_btn from 'assets/icons/24x24/nb_gray_bookmark_icon_24x24.png'

//styles
import 'components/styles/ReactionBar.scss'
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'

//utils
import { formatNumber } from 'utils/miscUtils.js'

class SummaryReactionBar extends Component {

  constructor(props) {
    super(props);

    this.likeCount = -1; //dummy for change
    this.state = { isLiked: 0, isSaved: 0 }
  }

  toggleLikeImage = () => {
    let tmpLike = this.state.isLiked;

    if (tmpLike === 0)
      if (this.props.likedStatus) tmpLike = 1;
      else tmpLike = -1;

    tmpLike = - tmpLike;

    if (this.props.likedStatus) {
      if ((tmpLike === -1)) {
        this.likeCount = this.props.likeCount - 1;
        this.props.unLikeAPost(this.props.id);
      }
      else {
        this.likeCount = this.props.likeCount;
        this.props.likeAPost(this.props.id);
      }
    }
    else {
      if (tmpLike === 1) {
        this.likeCount = this.props.likeCount + 1
        this.props.likeAPost(this.props.id);
      } else {
        this.props.unLikeAPost(this.props.id);
        this.likeCount = this.props.likeCount;
      }
    }

    this.setState({ isLiked: tmpLike });
  }

  toggleSaveImage = () => {
    let tmp = this.state.isSaved;
    if (tmp === 0) //neu la lan dau load component
      if (this.props.savedStatus) {
        tmp = 1;
        this.props.unSaveAPost(this.props.id)
      }
      else {
        tmp = -1;
        this.props.saveAPost(this.props.id)
      }
    else {
      if (tmp === 1)
        this.props.unSaveAPost(this.props.id)
      else
        this.props.saveAPost(this.props.id)
    }

    tmp = -tmp;

    //call API
    this.setState({ isSaved: tmp });
  }

  render() {
    // console.log(this.props);
    //#region like, unlike buttons
    let likeBtn = <div></div>;
    let saveBtn = <div></div>;

    //render likeBtn
    if (this.state.isLiked === 1 || (this.state.isLiked === 0 && this.props.likedStatus)) {
      likeBtn = <img className="post-like-btn" alt="like" src={liked_icon}></img>
    }
    else {
      likeBtn = <img className="post-like-btn" alt="like" src={unliked_icon} ></img>
    }

    //render saveBtn
    if (this.state.isSaved === 1 || (this.state.isSaved === 0 && this.props.savedStatus)) {
      saveBtn = <div className="d-flex">
        <img className="save-btn" alt="like" src={full_blue_bookmark_btn} />
        <div className="save-btn-text">Huỷ</div>
      </div>
    }
    else {
      saveBtn = <div className="d-flex" >
        <img className="save-btn" alt="dislike" src={gray_bookmark_btn} />
        <div className="save-btn-text">Lưu</div>
      </div >
    }

    return (
      <div className="reaction-bar">
        <div className="d-flex mg-top-5px">
          <div className="like-btn-container" onClick={this.toggleLikeImage} >
            <div> {likeBtn}</div>
            <div className="like-count">{formatNumber(this.likeCount === -1 ? this.props.likeCount : this.likeCount)}</div>
          </div>
          <div className="vertical-line" />
          <div className="save-btn-container" onClick={this.toggleSaveImage} >
            <div >{saveBtn}</div>
          </div>
          <div className="vertical-line" />
          <div className="comment-count-container">
            <div className="comment-btn-text">
              Bình luận
            </div>
            <div className="comment-btn-number">
              {formatNumber(this.props.commentCount)}
            </div>
          </div>
        </div>
        <div className="link-label mg-top-5px" onClick={() => { window.location.href = "/docs/category?id=" + this.props.id }}>
          Đọc tiếp ...
            </div>
      </div >
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  saveAPost, unSaveAPost, likeAPost, unLikeAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SummaryReactionBar));
