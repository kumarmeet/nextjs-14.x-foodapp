"use client";

import { useRef, useState } from "react";
import classes from "./ImagePicker.module.css";
import Image from "next/image";

export const ImagePicker = ({ label, name }) => {
  const imageInputRef = useRef();
  const [pickImage, setPickImage] = useState();

  const handlePick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickImage && <p>No image picked yet.</p>}
          {pickImage && (
            <Image
              src={pickImage}
              alt="Preview"
              fill
            />
          )}
        </div>
        <input
          type="file"
          name={name}
          id={name}
          accept="image/png, image/jped, image/jpg"
          className={classes.input}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />

        <button
          className={classes.button}
          type="button"
          onClick={handlePick}
        >
          Pick Image
        </button>
      </div>
    </div>
  );
};
