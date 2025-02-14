import React, { useEffect, useCallback } from 'react';
import './Popup.css';

const Popup = ({ show, handleClose }) => {
    const handleEscapeKey = useCallback((event) => {
        if (event.key === "Escape") {
            handleClose();
        }
    }, [handleClose]);

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
            document.addEventListener("keydown", handleEscapeKey);
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [show, handleEscapeKey]);

    if (!show) return null;

    return (
        <div className="AOLS-popup-overlay" onClick={handleClose} role="dialog" aria-modal="true">
            <div className="AOLS-popup-content" onClick={(e) => e.stopPropagation()}>
                <h2>We're Launching Soon!</h2>
                <p>Stay tuned for exciting updates and content coming your way. Thank you for your patience!</p>
                <button className="AOLS-popup-close-button" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;
