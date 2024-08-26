import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  maxWidth?: string;
};

const Container: React.FC<ContainerProps> = ({ children, maxWidth = '1440px' }) => {
  return (
    <div style={{ maxWidth }} className="mx-auto">
      {children}
    </div>
  );
};

export default Container;
