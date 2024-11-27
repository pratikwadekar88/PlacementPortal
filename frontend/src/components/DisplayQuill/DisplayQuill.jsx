import ReactQuill, { Quill } from "react-quill";
import BlotFormatter from "quill-blot-formatter";
import ImageCompress from "quill-image-compress";
import "react-quill/dist/quill.snow.css";
import "./quill.css";
import React from "react";

Quill.register("modules/imageCompress", ImageCompress);
Quill.register("modules/blotFormatter", BlotFormatter);

function DisplayQuill({ content }) {
  return (
    <div className="display-quill-container">
      <ReactQuill theme="bubble" readOnly value={content} />
    </div>
  );
}

export default DisplayQuill;
