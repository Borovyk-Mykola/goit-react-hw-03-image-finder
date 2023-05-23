import React from "react";

class Modal extends React.Component {

    componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    }
    
    componentWillUnmount() {
    window.removeEventListener('keydown', this.handleBackdropeClick);
    }
    
    handleKeyDown = e => {
        if (e.code === `Escape`) {
          this.props.onModalClose();
        }
    };
    
    handleBackdropeClick = e => {
        if (e.target === e.currentTarget) {
          this.props.onModalClose();
        }
    };

    render(){
        const { largeImageURL, tags } = this.props.modalData;
        return (
            <modal className="Modal" onClick={this.handleBackdropeClick}>
                <img src={largeImageURL} alt={tags} />
            </modal>
        )
    }
}

export default Modal