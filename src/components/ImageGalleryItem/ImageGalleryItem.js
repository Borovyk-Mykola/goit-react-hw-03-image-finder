import React from "react";

const ImageGalleryItem = ({largeImageURL, webformatURL, tags}) => (
    <li className="ImageGalleryItem">
        <a href={largeImageURL}>
            <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} width="240" loading="lazy"/>
        </a>
    </li>
);

export default ImageGalleryItem