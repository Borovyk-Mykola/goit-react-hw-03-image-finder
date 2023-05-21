import { nanoid } from "nanoid";
import React from "react";

class ImageGallery extends React.Component { 
  
  id = nanoid()

  render() {
    return (
    <ul className = "gallery" key={this.id}>
      <li className = "gallery-item">
          
      </li>
    </ul>
    )
  }
};

export default ImageGallery