import React from "react";
import { Item, Image } from "./GalleryItem.styled";

const GalleryItem = ({ src }) => {
  return (
    <Item>
      <Image src={src} alt="" />
    </Item>
  );
};
export default GalleryItem;
