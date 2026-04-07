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
      <Image
        src={
          product.image_url ||
          "https://via.placeholder.com/400x400?text=No+Image"
        }
        alt={product.name}
        style={{
          width: "100%",
          maxHeight: 380,
          objectFit: "contain",
        }}
        fallback="https://via.placeholder.com/400x400?text=No+Image"
      />
    </div>
  );
};

export default ProductGallery;
