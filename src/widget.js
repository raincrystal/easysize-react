'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Modal = require('react-modal');

const loadingImage = require('./assets/roulette_wheel_spinning.gif')
const styles = require('./styles');

const Widget = (props) => {
  const { placeholder_text, image, attributes, select_attribute } = props;

  // State for device
  const [isMobile, setIsMobile] = React.useState(false);

  // Get browser width
  const getWindowWidth = () => {
    // Set isMobile flag
    setIsMobile(window.innerWidth <= 756);
  };

  // Add browser resize event
  React.useEffect(() => {
    window.addEventListener('resize', getWindowWidth);
  }, []);

  // Get browser width whenever it is changed
  React.useEffect(() => {
    getWindowWidth();
  });

  // State for modal open
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = (open) => {
    setOpenModal(open);

    // When close modal, reset all states
    if (!open) {
      setRandomAttribute(null);
      setAfterSelectRandom(false);
    }
  };

  // Selected random attribute
  const [randomAttribute, setRandomAttribute] = React.useState(null);

  // Loading state for selecting random attribute
  const [loading, setLoading] = React.useState(false);

  // If random attribute was selected True else False
  const [afterRandomSelect, setAfterSelectRandom] = React.useState(false);

  // Handle modal button click
  const handleClickRndBtn = () => {
    // If random attribute was slected emit event and close modal, else select random attribute
    if (afterRandomSelect) {
      select_attribute(randomAttribute);
      handleOpenModal(false);
    } else {
      // Loading state
      setLoading(true);
      setAfterSelectRandom(false);

      // After some time select random attribute
      setTimeout(() => {
        if (attributes) {
          const randomAttributeIndex = Math.floor(Math.random() * attributes.length);
          setRandomAttribute(attributes[randomAttributeIndex]);
        }
        setLoading(false);
        setAfterSelectRandom(true);
      }, 3500);
    }
  }

  // Modal styles
  const modalStyles = {
    content : {
      display: 'flex',
      alignItems: 'center',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: isMobile ? '90%' : '450px',
      height: '450px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  };

  return (
    <div>
      <button style={styles.button} onClick={() => handleOpenModal(true)}>{placeholder_text}</button>
      <Modal
        style={modalStyles}
        isOpen={openModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        onRequestClose={() => handleOpenModal(false)}
      >
        {afterRandomSelect ? (
          <h1 style={styles.title}>{randomAttribute || 'No attribute'}</h1>
        ) : (
          <img style={styles.image} src={loading ? loadingImage : image} alt="product" />
        )}
        {!loading &&
          <button style={{...styles.button, ...styles.modalButton}} onClick={handleClickRndBtn}>
            {afterRandomSelect ? 'Select me' : 'Surprise me'}
          </button>
        }
      </Modal>
    </div>
  );
}


const WidgetController = (config) => ({
  // Initialize random attribute select widget
  start: () => {
    // Placeholder element from configuration
    const placeholder = document.querySelector(config.placeholder);

    // Create dom container
    const domContainer = document.createElement("div");

    // Assign random Id to dom container
    domContainer.id = 'easysize-widget-random-select-' + Math.random().toString().replace('.', '');

    // Style for dom container
    domContainer.style.margin = '20px 0 20px 0';

    // Append dom container to placeholder
    placeholder.appendChild(domContainer);

    // Render Widget component
    ReactDOM.render(<Widget {...config} />, domContainer);
  }
})

// Set WidgetController as a global variable
window.WidgetController = WidgetController;
