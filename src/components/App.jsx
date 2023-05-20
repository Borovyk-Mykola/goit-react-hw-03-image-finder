import React from 'react';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { createCard } from './components/ImageGalleryItem/ImageGalleryItem';
import { Pixabay } from './components/Searchbar/Searchbar';

const modalSimpleLightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const pixaby = new Pixabay();
const options = {
    root: null,
    rootMargin: '100px',
    threshold: 1.0,
};

const observer = new IntersectionObserver(loadMorePhotos, options);

export class App extends React.Component {

loadMorePhotos = async function (entries, observer) {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        pixaby.page += 1;
  
        try {
          const { hits } = await pixaby.getPhotos();
          const markup = createCard(hits);
          refs.gallery.insertAdjacentHTML('beforeend', markup);
  
          if (pixaby.hasMorePhotos()) {
            const lastItem = document.querySelector('.gallery a:last-child');
            observer.observe(lastItem);
          } else
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  
            modalSimpleLightbox.refresh();
            scrollPage();
        } catch (error) {
            Notiflix.Notify.failure(error.message, 'Something went wrong!');
            clearPage();
        } finally {}
      }
    });
};

onSubmitClick = async e => {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.target;

  const search_query = searchQuery.value.trim().toLowerCase();

  if (!search_query) {
    clearPage();
    Notiflix.Notify.info('Enter valid text to search!');
    return;
  }

  pixaby.query = search_query;
  clearPage();

  try {
    const { hits, total } = await pixaby.getPhotos();

    if (hits.length === 0) {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your ${search_query}. Please try again.`);
      return;
    };

    const markup = createCard(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    pixaby.totalPages = total;
    pixaby.page = 1;
    Notiflix.Notify.success(`Hooray! We found ${total} images.`);

    if (pixaby.hasMorePhotos()) {
      const lastItem = document.querySelector('.gallery a:last-child');
      observer.observe(lastItem);
    }

    modalSimpleLightbox.refresh();
    
  } catch (error) {
      Notiflix.Notify.failure(error.message, 'Something went wrong!');
      clearPage();
  } 
};

onLoadMore = async () => {
  pixaby.page += 1;

  if (!pixaby.hasMorePhotos()) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
  try {
    const { hits } = await pixaby.getPhotos();
    const markup = createCard(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    modalSimpleLightbox.refresh();
  } catch (error) {
      Notiflix.Notify.failure(error.message, 'Something went wrong!');
      clearPage();
  }
};

clearPage() {
  refs.gallery.innerHTML = '';
}
scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
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
          color: '#010101'
        }}
      >
        <form onSubmit={this.onSubmitClick}>
          <input type="text" autocomplete="off"
        placeholder = "Search..." />
          <button type="submit">Search</button>
        </form>
    
        <div className="gallery"></div>

        <button type="button" onSubmit={this.onLoadMore}>Load more</button>
      </div>
    )
  }
};
