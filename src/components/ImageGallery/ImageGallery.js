import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { Pixabay } from '../Pixabay'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends React.Component {
  state = {
    images: [],
    page: 2,
    status: Status.IDLE,
    showModal: false,
    modalData: { img: null, tags: '' },
  }

  addImage() {
    this.setState({status: Status.PENDING})
    const pixabay = new Pixabay();
    pixabay.query = this.props.value.trim().toLowerCase();
    
    pixabay.getPhotos().then(response =>
      {const res = response.hits;
      this.setState({images: [...res],
        status: Status.RESOLVED})
      }
    )
    if(this.state.images === [])
    this.setState({status: Status.REJECTED})
  }

  onClick = e => {
    e.preventDefault();
    this.setState({page: this.state.page + 1,
      status: Status.PENDING})
    
    const pixabay = new Pixabay();
    pixabay.page = this.state.page;
    pixabay.query = this.props.value.trim().toLowerCase();
    
    pixabay.getPhotos().then(response =>
      {const res = response.hits;
      if(res === [])
        this.setState({status: Status.REJECTED})
      else
        this.setState({images: [...this.state.images, ...res],
        status: Status.RESOLVED})
      }
    )
  }
  setModalData = modalData => {
    this.setState({ modalData, showModal: true });
  };

  onModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, status, page, showModal, modalData } = this.state;
    const { value } = this.props;

    if(page === 2) this.addImage()

    if (status === 'resolved') {
    return (
    <div style={{textAlign: 'center'}}>
      <ul className = "ImageGallery">
      {value !== '' && images.map(image => (
        <ImageGalleryItem 
        key={image.id}
        largeImageURL={image.largeImageURL} 
        webformatURL={image.webformatURL} 
        tags={image.tags} 
        onImageClick={this.setModalData}
        />))}
      </ul>
      <button type="button" className="Button" onClick={this.onClick}>
        <span>Load more</span>
      </button>
      {showModal && (
        <Modal modalData={modalData} onModalClose={this.onModalClose}/>
      )}
    </div>
  )}
  if (status === 'idle') {
    return <p text="Let`s goooo!"/>;
  }
  if (status === 'pending') {
    return <Loader/>;
  }
  if (status === 'rejected') {
    return <p text="Xaxaxa" />;
  }
  if (images.length === 0) {
    return (
      <p text={`Oops... there are no images matching your search ${value}`} />
    );
  }
}
}

export default ImageGallery