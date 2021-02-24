import React, { Component } from 'react'
import './Titlebar.scss'
import store from 'redux/store/index.js'
import { closeBigModal } from 'redux/actions/modalAction'
import close_icon from 'assets/icons/24x24/red_delete_icon_24x24.png'

class BigModalTitlebar extends Component {

    closeModal = () => { store.dispatch(closeBigModal()) }
    render() {
        return (
            <div className="title-bar">
                <div className="main-title">{this.props.title}</div>
                <div className="modal-close-icon">
                    <img src={close_icon} alt="x" onClick={() => this.closeModal()} />
                </div>
            </div>
        );
    }
}
export default BigModalTitlebar;