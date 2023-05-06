import React from 'react';
import '../styles/SegmentedControl.scss';

interface SegmentedControlProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  className: string;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, onChange, className }) => {
  const handleOptionClick = (value: string) => {
    onChange(value);
  };

  return (
    <div className="segmented-control">
      {options.map((option) => (
        <button
          key={option.value}
          className={`segmented-control__button ${className === option.value ? 'active' : ''}`}
          onClick={() => handleOptionClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;

