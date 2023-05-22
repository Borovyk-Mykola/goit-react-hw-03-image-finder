import React from "react";

const ImageGalleryItem = ({largeImageURL, webformatURL, tags}) => (
    <li className="gallery-item">
        <a href={largeImageURL}>
            <img src={webformatURL} alt={tags} width="240" loading="lazy"/>
        </a>
    </li>
);

export default ImageGalleryItem