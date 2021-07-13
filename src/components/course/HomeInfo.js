import React from 'react'
import 'components/styles/Button.scss'
import 'components/styles/HomeItem.scss'
import { Link } from 'react-router-dom'
import HomeReactionbar from 'components/post/HomeReactionbar'

class HomeFirstInfo extends React.Component {
  render() {

    return (
      <div className="home-item" style={{
        border: '1px solid var(--gray)',
        padding: "10px",
        paddingTop: "0px",
        boxShadow: "0px 0px 3px 0px"
      }} >
        <div className="metadata" >
          <div className="j-c-space-between mg-top-10px">
            <div className="d-flex">
              <div className="category">
                {this.props.categoryName}
              </div>
            </div>
            <div className="d-flex" >
              <div className="metadata-label" style={{ marginLeft: "2px" }}>
                {this.props.subjectName}
              </div>
              <div className="metadata-label" style={{ marginLeft: "2px" }}>
                {this.props.publishDtm.substring(0, 10)}
              </div>
            </div>

          </div>
        </div>

        {/* title */}
        <Link to={"/post-content/" + this.props.id}>
          <div className="title title-hv">
            {this.props.title}
          </div>
          <div className="title-hv-c">
            <div className="title-hv-m">
              {this.props.title}
            </div>
          </div>
        </Link>

        <div className="d-flex mg-top-5px" >
          <Link to={`/user/profile/${this.props.authorID}`}>
            <img style={{ marginLeft: "5px" }} className="avatar" src={this.props.authorAvatarURL} alt="" />
          </Link>
          <Link className="link-label-s mg-left-5px" style={{ lineHeight: "25px" }} to={`/user/profile/${this.props.authorID}`}>
            {this.props.authorDisplayName}
          </Link>
        </div>

        <div className="summary-text">
          {this.props.description}
        </div>

      </div>
    );
  }
}
export default HomeFirstInfo;