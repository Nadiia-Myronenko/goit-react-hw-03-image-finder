import React from "react";
import { Component } from "react";

import { List, Message, ButtonWrapper } from "./ImageGallery.styled";
import GalleryItem from "../GalleryItem/GalleryItem";
import Loader from "../Loader/Loader";
import { Button } from "../Button/Button.styled";

class ImageGallery extends Component {
  state = {
    pictures: null,
    allLoaded: false,
    error: null,
    status: "idle",
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.keyWord !== this.props.keyWord) {
      console.log(`Это componentDidUpdate. page: `, this.state);
      this.setState({ status: "pending", allLoaded: false, page: 1 });
      console.log(`Это componentDidUpdate. page: `, this.state);

      this.fetchPictures()
        .then((data) => {
          if (data.total) {
            this.incrementPage();
            console.log(`Это componentDidUpdate. page: `, this.state);
            console.log("страница", this.state.page);
            this.setState({ pictures: data.hits, status: "resolved" });
            if (data.total === this.state.pictures.length) {
              this.setState({ allLoaded: true });
            }
          } else {
            this.setState({ allLoaded: true });
            throw new Error("No images found for this request!");
          }
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }
  fetchPictures = () => {
    console.log(`Это fetch. page: `, this.state);
    return fetch(
      `https://pixabay.com/api/?q=${this.props.keyWord}&page=${this.state.page}&key=24183605-bf7aca68d7e367c79bb8460cd&image_type=photo&orientation=horizontal&per_page=12`
    ).then((res) => res.json());
  };
  incrementPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };
  onLoadMoreClick = () => {
    console.log("вызвалась функция onLoadMoreClick");
    this.incrementPage();
    if (!this.state.allLoaded) {
      this.fetchPictures()
        .then((data) => {
          if (data.total === this.state.pictures.length) {
            this.setState({ allLoaded: true });
          }
          console.log(data.hits);
          this.setState((prevState) => ({
            pictures: [...prevState.pictures, ...data.hits],
          }));
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  };
  render() {
    const { pictures, error, status } = this.state;
    console.log(this.state.allLoaded);
    if (status === "idle") {
      return <Message>Enter key word for image search!</Message>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <>
          <List>
            {pictures.map(({ id, webformatURL, largeImageURL }, index) => (
              <GalleryItem
                key={index}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                onClick={this.props.onClick}
              />
            ))}
          </List>
          {!this.state.allLoaded && (
            <ButtonWrapper>
              <Button type="button" onClick={this.onLoadMoreClick}>
                Load more...
              </Button>
            </ButtonWrapper>
          )}
        </>
      );
    }
    if (status === "rejected") {
      return <Message>{error.message}</Message>;
    }
  }
}
export default ImageGallery;
