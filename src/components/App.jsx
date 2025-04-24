import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "./SearchBar/SearchBar.jsx";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";

import ImageModal from "./ImageModal/ImageModal.jsx";

import Loader from "./Loader/Loader.jsx";
import ErrorMessage from "./ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.jsx";

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

  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [visible, setVisible] = useState(0);

  async function fetchImages(search, pageNum) {
    if (loading) return;

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
        toast.error("No photos for this topic");
        setImages([]);
        setTotalImages(0);
        setVisible(0);
        return;
      }

      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setVisible((prevVisible) => prevVisible + response.data.results.length);

      setTotalImages(response.data.total);

      setError(false);
    } catch (error) {
      setError(true);
      setTotalImages(0);
      setVisible(0);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(topic) {
    if (topic !== query) {
      setImages([]);
      setPage(1);
      setVisible(0);
      setTotalImages(0);
      setQuery(topic);
    }
  }

  ////PAGINATION
  const handleOnLoadMore = () => {
    if (loading || visible >= totalImages) return;
    const nextPage = page + 1;
    setPage(nextPage);
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

  useEffect(() => {
    if (query && page > 0) {
      fetchImages(query, page);
    }
  }, [query, page]);

  return (
    <>
      <Toaster position="top-right" />
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
