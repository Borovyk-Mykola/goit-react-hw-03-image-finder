import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends React.Component {
state ={

}
onSubmitClick(){

}

render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          
        }}
      >
        <Searchbar onSubmitForm={this.onSubmitClick}/>
          
        <ImageGallery/>

      </div>
    )
  }
};
