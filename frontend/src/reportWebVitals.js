// import { type ReportHandler } from 'web-vitals';

import React from 'react';

// const reportWebVitals = (onPerfEntry?: ReportHandler) => {
//   if ((onPerfEntry != null) && onPerfEntry instanceof Function) {
//     import('web-vitals').then(({
//       getCLS, getFID, getFCP, getLCP, getTTFB,
//     }) => {
//       getCLS(onPerfEntry);
//       getFID(onPerfEntry);
//       getFCP(onPerfEntry);
//       getLCP(onPerfEntry);
//       getTTFB(onPerfEntry);
//     });
//   }
// };

// export default reportWebVitals;

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry != null && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
