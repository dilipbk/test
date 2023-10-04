import { CButton } from "@coreui/react";

const Button = ({ children, options }) => {
  if (options) {
    return (
      <CButton {...options} shape="rounded-0" color="dark">
        {children}
      </CButton>
    );
  }
};

export default Button;
