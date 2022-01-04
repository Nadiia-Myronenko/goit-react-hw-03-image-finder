import React from "react";
import { Component } from "react";
import { List } from "./ImageGallery.styled";
import GalleryItem from "../GalleryItem/GalleryItem";

class ImageGallery extends Component {
  state = {
    pictures: null,
    loading: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.keyWord !== this.props.keyWord) {
      this.setState({ loading: true, pictures: null, error: null });
      fetch(
        `https://pixabay.com/api/?q=${this.props.keyWord}&page=1&key=24183605-bf7aca68d7e367c79bb8460cd&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((pictures) => {
          console.log(pictures.total);
          if (pictures.total) {
            console.log(pictures);
            this.setState({ pictures });
          } else throw new Error("No images found for this request");
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { loading, pictures, error } = this.state;
    return (
      <>
        {error && <p>{error.message}</p>}
        {loading && <p>Загружаем...</p>}
        {pictures && (
          <List>
            {this.state.pictures.hits.map(({ id, webformatURL }) => (
              <GalleryItem key={id} src={webformatURL} />
            ))}
          </List>
        )}
      </>
    );
  }
}
export default ImageGallery;
