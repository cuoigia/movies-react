import React from 'react';
import '../styles/ErrorMessage.scss';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="ErrorMessage">
      <p className="message">{message}</p>
    </div>
  );
};

export default ErrorMessage;
