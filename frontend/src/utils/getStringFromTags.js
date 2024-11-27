import React from "react";

const getStringFromTags = (tags) => {
  const stringTags = tags.map((tag) => `#${tag}`).join(' ');
  return stringTags;
};

export default getStringFromTags;
