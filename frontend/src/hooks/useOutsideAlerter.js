import React,{ useEffect } from "react";

const useOutsideAlerter = (wrapperRef, actionCallback) => {
  // The useEffect is used to handle the closing of the drop down

  useEffect(() => {
    // Attribution: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

    const handleClickOutside = (event) => {
      if (!event.target) return;

      const target = event.target;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        actionCallback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, actionCallback]);
};

export default useOutsideAlerter;
