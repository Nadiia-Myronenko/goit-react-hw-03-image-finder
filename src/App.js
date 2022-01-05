import { Component } from "react";

import { Wrapper, ButtonWrapper } from "./App.styled";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    keyWord: "",
    showModal: false,
    largeImgSrc: "",
  };

  handleFormSubmit = (keyWord) => {
    this.setState({ keyWord: keyWord });
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  onImgClick = (largeImageURL) => {
    this.toggleModal();
    this.setState({ largeImgSrc: largeImageURL });
  };
  render() {
    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery keyWord={this.state.keyWord} onClick={this.onImgClick} />
        <ButtonWrapper>
          <Button>More</Button>
        </ButtonWrapper>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={this.state.largeImgSrc}
              alt=""
              width="100%"
              height="100%"
            />
            <button onClick={this.toggleModal}>Close Modal</button>
          </Modal>
        )}

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Wrapper>
    );
  }
}

export default App;
