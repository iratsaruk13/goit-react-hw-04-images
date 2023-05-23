import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header, FormStyle, SearchInput, SearchBtn } from "./Searchbar.styled";
import { FaSearchengin } from "react-icons/fa";
import propTypes from "prop-types";
import { useState } from "react";

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeQuery = (evt) => {
    setSearchQuery(evt.target.value);
  };

  const formSubmit = (evt) => {
    evt.preventDefault();
    if (searchQuery.trim() === "") {
      toast.error("The search field cannot be empty");
      return;
    }
    onSubmit(searchQuery.trim());
    setSearchQuery("");
  };

  return (
    <Header>
      <FormStyle onSubmit={formSubmit}>
        <SearchInput
          name="searchValue"
          type="text"
          value={searchQuery}
          autoFocus
          placeholder="Enter your search query"
          onChange={onChangeQuery}
        />
        <SearchBtn type="submit">
          <FaSearchengin />
        </SearchBtn>
      </FormStyle>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};
