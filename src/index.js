/*eslint-disable*/

/* eslint-disable global-require */
import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/bootstrap.rtl.only.min.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-image-lightbox/style.css';
import 'video.js/dist/video-js.css';
// import { defaultColor } from './constants/defaultValues';
// import { setCurrentColor } from './helpers/Utils';

//  const color = defaultColor
// //   isMultiColorActive || isDarkSwitchActive ? getCurrentColor() : defaultColor;
// // alert(defaultColor);

// setCurrentColor(color);

// const render = () => {
//   import(`./assets/css/sass/themes/gogo.${color}.scss`).then(() => {
//     require('./AppRenderer');
//   });
// };
// render();


import React from 'react'
import { Suspense } from 'react';
import { defaultColor } from './constants/defaultValues';
import { setCurrentColor } from './helpers/Utils';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
const color = defaultColor;
import "./assets/css/sass/themes/gogo.light.bluenavy.scss"
setCurrentColor(color);

const App = React.lazy(() => import(/* webpackChunkName: "App" */ './App'));
const Main = () => {
  return (
    <Provider store={configureStore()}>
      <Suspense fallback={<div className="loading" />}>
        <App />
      </Suspense>
    </Provider>
  );
};
ReactDOM.render(<Main />, document.getElementById('root'));