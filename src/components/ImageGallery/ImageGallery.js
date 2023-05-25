import React from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { Pixabay } from '../Pixabay'
import Loader from '../Loader/Loader'
import Button from '../Button/Button'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends React.Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  state = {
    value: '',
    images: [],
    page: 0,
    stutus: Status.IDLE,
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.value !== this.props.value 
      && this.state.images !== [])
    this.addImage()
  }

  addImage() {
    this.setState({page: 1, stutus: Status.PENDING, 
      value: this.props.value})
  
    const pixabay = new Pixabay();
    pixabay.query = this.props.value.trim().toLowerCase();
    
    pixabay.getPhotos().then(response =>
      {const result = response.hits;
      if(result.length === 0)
        {alert('Enter valid text to search!')
        this.setState({page: 0, stutus: Status.IDLE, value: ''})}
      else this.setState({images: [...result], stutus: Status.RESOLVED})
      }
    )
  }

  onClick = e => {
    e.preventDefault();
    const {page, images} = this.state
    const pixabay = new Pixabay();
    
    if(pixabay.hasMorePhotos()){
    this.setState({page: page + 1, stutus: Status.PENDING})

    pixabay.page = page + 1;
    pixabay.query = this.props.value.trim().toLowerCase();
    
    pixabay.getPhotos().then(response =>
      {const result = response.hits;
      this.setState({images: [...images, ...result],
        stutus: Status.RESOLVED})
      }
    )}
    else 
    alert(`We're sorry, but you've reached the end of search results ${this.props.value}`)
  }

  render() {
    const {value, images, status} = this.state;
    if(status === 'idle' && value !== '') this.addImage()
    if(status === 'resolved'){
      return (
        <div>
          <ul className = "ImageGallery" >
          {images.map(image => (
            <ImageGalleryItem 
              key={image.id}
              largeImageURL={image.largeImageURL} 
              webformatURL={image.webformatURL} 
              tags={image.tags} 
            />))
          }
          </ul>
          <Button onClick={this.onClick}/>
        </div>
    )}
    if(status === 'pending')
    {return <Loader/>}
  }
}

export default ImageGallery