import React, { useState } from 'react';
import Modal from 'react-modal';
import './modal-styles.css'; // Import the styles

Modal.setAppElement('#root'); // Ensure this matches your app root element

export default function SelectOptionsModal({ isOpen, onRequestClose, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const handleAddToCart = () => {
    onAddToCart(selectedColor, selectedSize);
    onRequestClose(); // Close the modal after adding to cart
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Select Options"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">Select Color and Size</h2>
      <div className="modal-body">
        <div className="modal-field">
          <label className="modal-label">Color:</label>
          <select
            className="modal-select"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">Select Color</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
          </select>
        </div>
        <div className="modal-field">
          <label className="modal-label">Size:</label>
          <select
            className="modal-select"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Select Size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-button" onClick={handleAddToCart}>Add to Cart</button>
        <button className="modal-button modal-button-cancel" onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
}
