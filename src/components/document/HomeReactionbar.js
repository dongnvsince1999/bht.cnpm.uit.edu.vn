import React from 'react'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//resources
import liked_icon from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_icon from 'assets/icons/24x24/unliked_icon_24x24.png'
import dislike_btn from 'assets/icons/24x24/disliked_icon_24x24.png'
import undislike_btn from 'assets/icons/24x24/undisliked_icon_24x24.png'
import download_btn from 'assets/icons/24x24/gray_download_icon_24x24.png'
import preview_icon from 'assets/icons/24x24/gray_preview_icon_24x24.png'

//styles
import 'components/styles/Reactionbar.scss'
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'

//utils
import { formatNumber } from 'utils/miscUtils.js'
import { docReactionType } from 'constants.js'
import { reactionADocument } from 'redux/services/documentServices'

class NormalReactionbar extends React.Component {

  constructor(props) {
    super(props);

    this.likeCount = -1; //dummy for change
    this.dislikeCount = -1; //dummy for change

    this.state = { isLiked: 0, isDisliked: 0 }
  }

  componentDidMount() {
    this.likeCount = this.props.likeCount;
    this.dislikeCount = this.props.dislikeCount;
    switch (this.props.docReactionType) {
      case docReactionType.like:
        this.setState({
          isLiked: 1, isDisliked: 0
        });
        break;
      case docReactionType.dislike:
        this.setState({
          isLiked: 0, isDisliked: 1
        })
        break;
      default:
        this.setState({
          isLiked: 0, isDisliked: 0
        })
    }
    this.calculateBar();
  }

  toggleLikeImage = () => {

    if (this.state.isLiked === 0) { //neu bam like ma chua like

      if (this.props.docReactionType === docReactionType.like) //neu trc khi load da like
        this.likeCount = this.props.likeCount;
      else this.likeCount = this.props.likeCount + 1; //chua dislike va chua like
      if (this.state.isDisliked === 1) { //da dislike va chua like
        this.dislikeCount = this.dislikeCount - 1;
      }
      //call API like
      this.props.reactionADocument(this.props.id, docReactionType.like)
      this.setState({ isLiked: 1, isDisliked: 0 })
      this.calculateBar();
      return;
    }

    //neu da like 
    //call API none
    this.props.reactionADocument(this.props.id, docReactionType.none)
    this.likeCount = this.likeCount - 1;
    this.setState({ isDisliked: 0, isLiked: 0 });
    this.calculateBar();


  }

  toggleDislikeImage = () => {

    if (this.state.isDisliked === 0) { //neu bam dislike ma chua dislike
      if (this.props.docReactionType === docReactionType.dislike) //neu trc khi load da dislike
        this.dislikeCount = this.props.dislikeCount;
      else this.dislikeCount = this.props.dislikeCount + 1; //chua dislike va chua like
      if (this.state.isLiked === 1) { //neu bam dislike va da like
        this.likeCount = this.likeCount - 1;
      }
      //call API dislike
      this.props.reactionADocument(this.props.id, docReactionType.dislike)
      this.setState({ isDisliked: 1, isLiked: 0 })
      this.calculateBar();
      return;
    }

    //neu da dislike 
    this.props.reactionADocument(this.props.id, docReactionType.none)
    this.dislikeCount = this.dislikeCount - 1;
    this.setState({ isDisliked: 0, isLiked: 0 });
    this.calculateBar();



  }

  render() {
    // 
    //#region like, unlike buttons
    let likeBtn = <div></div>;
    let dislikeBtn = <div></div>;

    //render likeBtn
    if (this.state.isLiked === 1) {
      likeBtn = <img className="document-like-btn" alt="like" src={liked_icon}></img>
    }
    else {
      likeBtn = <img className="document-like-btn" alt="like" src={unliked_icon} ></img>
    }

    // render saveBtn
    if (this.state.isDisliked === 1) {
      dislikeBtn = <div className="d-flex">
        <img className="document-dislike-btn" alt="like" src={dislike_btn} />
      </div>
    }
    else {
      dislikeBtn = <div className="d-flex" >
        <img className="document-dislike-btn" alt="dislike" src={undislike_btn} />
      </div >
    }

    return (
      <div className="reaction-bar">
        <div className="d-flex mg-top-5px">
          <div className="like-dislike-rate-bar">
            <div className="d-flex">
              <div className="like-btn-container" onClick={this.props.type !== "PREVIEW" && this.toggleLikeImage} >
                <div className="d-flex"> {likeBtn}</div>
                <div className="document-like-count">{this.likeCount ? formatNumber(this.likeCount) : 0 }</div>
              </div>
              <div className="like-btn-container" onClick={this.props.type !== "PREVIEW" && this.toggleDislikeImage} >
                {dislikeBtn}
                <div className="document-like-count">{this.dislikeCount ? formatNumber(this.dislikeCount) : 0}</div>
              </div>
            </div>

            <div className="rate-percent-bar" />
            <div style={{ position: "relative" }}>
              <div className="blue-rate-percent-bar" id={"dl-percents-" + this.props.id} />
            </div>

          </div>
          <div className="vertical-line" />
          <div className="document-comment-count-container">
            <div className="comment-btn-text">
              Bình luận
            </div>
            <div className="comment-btn-number">
              {this.props.commentCount ? formatNumber(this.props.commentCount) : 0}
            </div>
          </div>
        </div>

        <div className="d-flex">
          <div className="view-count-container">
            <img className="preview-icon" src={preview_icon} alt="" />
            <div className="view-count"  >{this.props.viewCount ? formatNumber(this.props.viewCount) : 0}</div>
          </div >
          <div className="download-btn-container">
            <img className="download-btn" src={download_btn} alt="" />
            <div className="download-count"  >{this.props.downloadCount ? formatNumber(this.props.downloadCount) : 0}</div>
          </div >
        </div >
      </div>

    );
  }

  // Calculates bar widths
  calculateBar = () => {

    if (this.likeCount === this.dislikeCount) {
      if (document.getElementById('dl-percents-' + this.props.id))
        document.getElementById('dl-percents-' + this.props.id).style.width = "50%";
      return;
    }
    else {
      let percentageLikes;
      //Simple math to calculate percentages
      let total = this.likeCount + this.dislikeCount;
      percentageLikes = (this.likeCount / total) * 100;
      if (document.getElementById('dl-percents-' + this.props.id))
        //We need to apply the widths to our elements
        document.getElementById('dl-percents-' + this.props.id).style.width = percentageLikes.toString() + "%";
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // saveAPost, unSaveAPost, likeAPost, unLikeAPost
  reactionADocument
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NormalReactionbar));

