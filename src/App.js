import { Component } from "react";

import Wrapper from "./components/Wrapper/Wrapper.styled";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    keyWord: "",
    showModal: false,
  };

  handleFormSubmit = (keyWord) => {
    this.setState({ keyWord: keyWord });
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  render() {
    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery keyWord={this.state.keyWord} onClick={this.toggleModal} />
        <button onClick={this.toggleModal}>Open Modal</button>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
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
