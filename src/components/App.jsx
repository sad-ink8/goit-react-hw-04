import { useState } from "react";
import axios from "axios";

import SearchBar from "../components/SearchBar/SearchBar.jsx";
import ImageGallery from "../components/ImageGallery/ImageGallery";

import ImageModal from "../components/ImageModal/ImageModal";

import Loader from "../components/Loader/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";

////
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
/////

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(false);

  const [page, setPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [visible, setVisible] = useState(0);

  async function fetchImages(search, pageNum) {
    try {
      setLoading(true);

      const accessKey = "rQ-bYsY6JCiKCtNuToGFcv9fTdNQFxnXyN6vXONnhyQ";
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: search,
            page: pageNum,
            client_id: accessKey,
            per_page: 4,
          },
        }
      );
      if (response.data.results.length === 0) {
        alert("No photos for this topic");
        return;
      }

      setVisible((images) => images + response.data.results.length);
      setImages((images) => [...images, ...response.data.results]);

      setQuery(search);

      setTotalImages(response.data.total);

      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(topic) {
    setImages([]);
    setPage(1);
    setVisible(0);
    fetchImages(topic, 1);
  }

  ////PAGINATION
  const handleOnLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchImages(query, nextPage);
  };
  ///

  ////MODAL
  function openModal(image) {
    setIsOpen(true);
    setModalImage(image);
  }

  function closeModal() {
    setIsOpen(false);
    setModalImage(false);
  }
  ///

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      <ImageGallery images={images} onCardClick={openModal} />
      {loading && <Loader />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        image={modalImage}
      />
      {totalImages > 0 ? (
        visible < totalImages ? (
          <div>
            <LoadMoreBtn loadMoreOnClick={handleOnLoadMore} loading={loading} />
          </div>
        ) : (
          <div>
            <p>No more images for this topic.</p>
          </div>
        )
      ) : null}
    </>
  );
}

export default App;
