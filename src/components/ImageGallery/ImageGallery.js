import React from "react";
import { Component } from "react";

import { List, Message } from "./ImageGallery.styled";
import GalleryItem from "../GalleryItem/GalleryItem";
import Loader from "../Loader/Loader";

class ImageGallery extends Component {
  state = {
    pictures: null,
    error: null,
    status: "idle",
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.keyWord !== this.props.keyWord) {
      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?q=${this.props.keyWord}&page=1&key=24183605-bf7aca68d7e367c79bb8460cd&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((pictures) => {
          if (pictures.total) {
            console.log(pictures);
            this.setState({ pictures, status: "resolved" });
          } else throw new Error("No images found for this request!");
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }
  render() {
    const { pictures, error, status } = this.state;
    if (status === "idle") {
      return <Message>Enter key word for image search!</Message>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <List>
          {pictures.hits.map(({ id, webformatURL }) => (
            <GalleryItem key={id} src={webformatURL} />
          ))}
        </List>
      );
    }
    if (status === "rejected") {
      return <Message>{error.message}</Message>;
    }
  }
}
export default ImageGallery;
