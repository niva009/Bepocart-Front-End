import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './modal-styles.css';
import axios from 'axios'

Modal.setAppElement('#root'); // Ensure to set this to your app's root element

export default function SelectOptionsModal({ isOpen, onRequestClose, onAddToCart, product, productId }) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');



  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      onAddToCart(selectedColor, selectedSize);
      onRequestClose();
    } else {
      alert('Please select a color and size.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Select Options</h2>
      <p>Product ID: {productId}</p>
      {product && (
        <div>
          <div className="product-image">
            <img src={`${import.meta.env.VITE_PUBLIC_URL}/${product.image}`} alt={product.name} />
          </div>
          <h3>{product.name}</h3>
          <p>{product.short_description}</p>
          <div className="options">
            <div className="color-options">
              <h4>Select Color</h4>
              {product.images.map(image => (
                <button
                  key={image.id}
                  style={{ backgroundColor: image.color }}
                  className={selectedColor === image.id ? 'selected' : ''}
                  onClick={() => setSelectedColor(image.id)}
                >
                  {image.color_name}
                </button>
              ))}
            </div>
            <div className="size-options">
              <h4>Select Size</h4>
              {product.variants.map(variant => (
                <button
                  key={variant.id}
                  className={selectedSize === variant.size ? 'selected' : ''}
                  onClick={() => setSelectedSize(variant.size)}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
