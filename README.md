# Random attribute selector

### Run on local
 - `npm install`
 - `npm run build`
 - `npm start`
 - Library file should be served at http://127.0.0.1:3355/demo.js

### Configuration example

```js
  // Add script
  <body>
    <script src="http://127.0.0.1:3355/demo.js" charset="utf-8"></script>
  </body>

  // Widget configuration
  const configuration = {
    attributes: ['red', 'blue', 'black'],
    placeholder: '.product-color',
    placeholder_text: 'Surprise me with the color',
    cart_button: '.cart-btn',
    image: window.location.origin + '/images/black.png',
    select_attribute: function(color) {
      $('#' + color).click();
    }
  };

  const widget = new WidgetController(configuration);
  
  setTimeout(widget.start(), 2000);
```
