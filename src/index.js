/* eslint-disable global-require */
import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/bootstrap.rtl.only.min.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-image-lightbox/style.css';
import 'video.js/dist/video-js.css';
import { defaultColor } from './constants/defaultValues';
import { setCurrentColor } from './helpers/Utils';

 const color = defaultColor
//   isMultiColorActive || isDarkSwitchActive ? getCurrentColor() : defaultColor;
// alert(defaultColor);

setCurrentColor(color);

const render = () => {
  import(`./assets/css/sass/themes/gogo.${color}.scss`).then(() => {
    require('./AppRenderer');
  }).catch(function(error) {
      console.log(error)
  })
};
render();
