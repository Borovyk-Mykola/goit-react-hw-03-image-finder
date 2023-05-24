import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { Pixabay } from '../Pixabay'
import Loader from '../Loader/Loader'
import Button from '../Button/Button'


class ImageGallery extends React.Component {
  state = {
    images: [],
    page: 0,
    loader: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.value !== this.props.value)
    this.addImage()
  }

  addImage() {
    this.setState({page: 1, loader: true})
  
    const pixabay = new Pixabay();
    pixabay.query = this.props.value.trim().toLowerCase();
    
    pixabay.getPhotos().then(response =>
      {const res = response.hits;
      this.setState({images: [...res], loader: false})
      }
    )
  }

  onClick = e => {
    e.preventDefault();
    const {page, images} = this.state
    
    this.setState({page: page + 1, loader: true})

    const pixabay = new Pixabay();
    pixabay.page = page + 1;
    pixabay.query = this.props.value.trim().toLowerCase();
    
    pixabay.getPhotos().then(response =>
      {const res = response.hits;
      this.setState({images: [...images, ...res],
        loader: false})
      }
    )
  }

  render() {
    const { images, page, loader} = this.state;
   
    if(page === 0 && !loader) this.addImage()
    return (
    <div>
      <ul className = "ImageGallery" >
      {images !== [] && !loader && images.map(image => (
        <ImageGalleryItem 
        key={image.id}
        largeImageURL={image.largeImageURL} 
        webformatURL={image.webformatURL} 
        tags={image.tags} 
        />))}
      </ul>
      <div style={{textAlign: 'center'}}>
        {images !== [] && !loader && <Button onClick={this.onClick}/>}
        {loader && <Loader/>}
      </div>
    </div>
    )
  }
}

export default ImageGallery