import React from "react";
import { Image } from "antd";

const ProductGallery = ({ product }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid var(--neutral-200)",
        overflow: "hidden",
        padding: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {}
      <img
        src={product.image_url}
        alt={product.name}
        style={{
          width: "100%",
          maxHeight: 380,
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default ProductGallery;
