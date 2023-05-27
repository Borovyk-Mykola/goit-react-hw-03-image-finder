import React from "react";

const ImageGalleryItem = ({largeImageURL, tags, webformatURL, onImageClick }) => {
    return (
      <li className="ImageGalleryItem"
        onClick={ e => {
          e.preventDefault();
          onImageClick({ largeImageURL, tags });
        }}>
        <div>
          <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} loading="lazy"/>
        </div>
      </li>
    );
  };
  
export default ImageGalleryItem