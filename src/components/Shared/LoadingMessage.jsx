import PropTypes from 'prop-types';

const LoadingMessage = ({ message }) => (
  <section className="loading-container">
    <div className="loading-layout">
      <h1 className="loading-title">{message || "Loading..."}</h1>
    </div>
  </section>
);

export default LoadingMessage;

LoadingMessage.propTypes = {
  message: PropTypes.string,
};