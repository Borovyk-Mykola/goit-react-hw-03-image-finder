import React from "react";

const ImageGalleryItem = ({largeImageURL, tags, webformatURL, onImageClick }) => {
    return (
      <li className="ImageGalleryItem"
        onClick={e => {
          e.preventDefault();
          onImageClick({ largeImageURL, tags });
        }}>
        <a href={largeImageURL}>
          <img src={webformatURL} alt={tags} width="240" loading="lazy"/>
        </a>
      </li>
    );
  };
  
export default ImageGalleryItem