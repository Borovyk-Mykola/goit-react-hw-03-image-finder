import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { Pixabay } from '../Pixabay'

class ImageGallery extends React.Component {
  state = {
    images: []
  }

  onImage() {
    const pixabay = new Pixabay();
    pixabay.query = this.props.value.trim().toLowerCase();
    pixabay.getPhotos().then(response =>
      {const res = response.hits;
        this.setState({
          images: [...res]
        })})
  }

  render() {
    this.onImage()
    return (
    <ul className = "gallery">
      {this.props.value !== '' && this.state.images.map(image => (
        <ImageGalleryItem 
        key={image.id}
        largeImageURL={image.largeImageURL} 
        webformatURL={image.webformatURL} 
        tags={image.tags} 
        />))}
    </ul>
    )}
}

export default ImageGallery