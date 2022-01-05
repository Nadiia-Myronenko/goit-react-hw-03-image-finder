import React from "react";
import { Item, Image } from "./GalleryItem.styled";

const GalleryItem = ({ src, onClick }) => {
  return (
    <Item onClick={onClick}>
      <Image src={src} alt="" />
    </Item>
  );
};
export default GalleryItem;
