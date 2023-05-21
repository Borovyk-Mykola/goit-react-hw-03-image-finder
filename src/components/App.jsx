import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends React.Component {
state ={
  value: '',
  
}

onSubmitClick = (data) => {
  console.log(data)
  
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
        <header className="searchbar">
          <Searchbar onSubmit={this.onSubmitClick}/>
        </header>
        <ImageGallery/>

      </div>
    )
  }
};
