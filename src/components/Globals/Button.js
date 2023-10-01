import React from "react";

const Button = ({ children, options }) => {
  if (options) {
    return (
      <button {...options} shape="rounded-0">
        {children}
      </button>
    );
  }
  return (
    <button className="bg-black" shape="rounded-0">
      {children}
    </button>
  );
};

export default Button;
