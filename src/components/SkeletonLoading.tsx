import React from 'react';
import '../styles/SkeletonLoading.scss';

const SkeletonLoading: React.FC = () => {
  return (
    <div className="SkeletonLoading">
      <div className="SkeletonLoading__poster"></div>
      <div className="SkeletonLoading__details">
        <div className="SkeletonLoading__title"></div>
        <div className="SkeletonLoading__overview"></div>
        <div className="SkeletonLoading__release-date"></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
