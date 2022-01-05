import { Component } from "react";

import Wrapper from "./components/Wrapper/Wrapper.styled";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

class App extends Component {
  state = {
    keyWord: "",
  };
  handleFormSubmit = (keyWord) => {
    this.setState({ keyWord: keyWord });
  };
  render() {
    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery keyWord={this.state.keyWord} />
      </Wrapper>
    );
  }
}

export default App;
