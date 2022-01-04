import { Component } from "react";

import { HiOutlineSearch } from "react-icons/hi";
import {
  SearchBar,
  SearchForm,
  SearchButton,
  SearchFormInput,
} from "./Searchbar.styled";

class Searchbar extends Component {
  render() {
    return (
      <SearchBar>
        <SearchForm>
          <SearchButton type="submit" class="button">
            <HiOutlineSearch style={{ height: "2em", width: "2em" }} />
          </SearchButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchBar>
    );
  }
}
export default Searchbar;
