import React from 'react';

/**
 * A responsive ornate divider component styled with Tailwind CSS,
 * replicating the design from alexfisherdesign.ca.
 */
const Divider = () => {
  const dividerStyle = {
    backgroundImage:
      'url(https://cdn.prod.website-files.com/5ffa251a4d19bf4da4d0153e/608b44de30d1777b03b89a77_0001_Line-Design_1000.svg)',
  };

  return (
    <div
      className="block h-[23px] w-full bg-cover bg-no-repeat bg-[center_top] lg:mx-auto lg:w-[900px] lg:max-w-[900px]"
      style={dividerStyle}
      role="presentation"
    ></div>
  );
};

export default Divider;