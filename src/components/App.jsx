import { fetchImages } from "../services/api";
import { Loader } from "./Loader/Loader";
import { Searchbar } from "./Searchbar/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import catEmpty from "./images/cat.png";
import {
  Container,
  Empty,
  EmptyText,
  LoadMoreBtn,
} from "./ImageGallery/ImageGallery.styled";
import { useState, useEffect } from "react";

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState(1);

  useEffect(() => {
    if (images.length > 12) {
      const { height: cardHeight } = document
        .querySelector("ul")
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 4,
        behavior: "smooth",
      });
    }
  });

  useEffect(() => {
    if (searchQuery) getPictures();
    async function getPictures() {
      try {
        setLoading(true);
        const response = await fetchImages(searchQuery, page);

        if (!response.hits.length) {
          toast.error(`There are no images : ${searchQuery}`);
          return setEmpty(true);
        }
        setImages((prevImg) => [...prevImg, ...response.hits]);
        setTotal(response.total);
        setEmpty(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [page, searchQuery]);

  const onSearchQueryChange = (searchQuery) => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setEmpty(false);
  };
  const btnLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container>
      {loading && <Loader></Loader>}
      <Searchbar onSubmit={onSearchQueryChange} />
      {error && <p>Something wrong: ({error})</p>}
      <ImageGallery images={images} />
      {empty && (
        <Empty>
          <EmptyText> There are no images matching your query 😢</EmptyText>
          <img src={catEmpty} alt="cat" width="300" />
        </Empty>
      )}

      {total / 12 > page && (
        <LoadMoreBtn type="button" onClick={btnLoadMore}>
          Load More
        </LoadMoreBtn>
      )}
      <ToastContainer autoClose={2000} />
    </Container>
  );
};
