'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const Widget = (props) => {
  const [clicked, setClicked] = React.useState(false);
  const handleClickBtn = () => {
    setClicked(true);
  };

  if (clicked) {
    return 'Clicked';
  };

  return React.createElement(
    'button',
    { 
      style: { background: 'red'},
      onClick: (e) => {
        handleClickBtn();
      }
    },
    'Surprise me with the color'
  );
}


class WidgetController {
  constructor(config) {
    this.config = config;
  }

  start() {
    const domContainer = document.querySelector('.product-color');
    ReactDOM.render(React.createElement(() => Widget(this.config)), domContainer);
  }
}

window.WidgetController = WidgetController;
