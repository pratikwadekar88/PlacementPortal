import React, { useRef } from "react";
import styles from "./Image.module.css";

function Image({
  imageSrc,
  imageAlt,
  smallImageSrc,
  containerClassName,
  imageClassName,
}) {
  const imageContainerRef = useRef(null);

  const handleOnImageLoad = () => {
    if (!imageContainerRef?.current) return;
    imageContainerRef.current.classList.add(styles.imageLoaded);
  };

  return (
    <div
      ref={imageContainerRef}
      className={`${styles.blurLoad} ${containerClassName}`}
      style={{ backgroundImage: `url(${smallImageSrc})` }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className={imageClassName}
        loading="lazy"
        onLoad={handleOnImageLoad}
      />
    </div>
  );
}

export default Image;
