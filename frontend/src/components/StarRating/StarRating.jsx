import React from "react";
import { Formik, useFormikContext } from "formik";
import { Rating } from "react-simple-star-rating";
import styles from "./StarRating.module.css";

function StarRating({ name }) {
  const formikProps = useFormikContext();

  const handleRating = (rate) => {
    formikProps.setFieldValue(name, rate);
  };

  return (
      <div className={styles.StarRating}>
        <div className={styles.App}>
          <Rating onClick={handleRating} />
        </div>
      </div>
  );
}

export default StarRating;
