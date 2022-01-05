import React from "react";
import { Item, Image } from "./GalleryItem.styled";

const GalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <Item onClick={() => onClick(largeImageURL)}>
      <Image src={webformatURL} alt="" />
    </Item>
  );
};
export default GalleryItem;
