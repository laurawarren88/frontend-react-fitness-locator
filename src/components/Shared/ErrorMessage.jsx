import React from "react";
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => (
  <section className="message-container">
    <div className="message-layout">
      <h1 className="message-title">Error</h1>
      <p className="message-text">{message || "An error occurred."}</p>
    </div>
  </section>
);

export default ErrorMessage;

ErrorMessage.propTypes = {
  message: PropTypes.string,
};