import React, { useState } from 'react';
import {
  CButton,
  CCol,
  CCard,
  CCardBody,
  CRow,
  CCollapse,
} from "@coreui/react";

function MultipleCollapses() {
  const [visible, setVisible] = useState([]);

  // Function to toggle the visibility of a specific element
  const toggleCollapse = (index) => {
    const updatedVisible = [...visible];
    updatedVisible[index] = !updatedVisible[index];
    setVisible(updatedVisible);
  };

  return (
    <>
      {visible.map((isVisible, index) => (
        <div key={index}>
          <CButton onClick={() => toggleCollapse(index)}>
            Toggle Element {index + 1}
          </CButton>
          <CRow>
            <CCol xs={6}>
              <CCollapse visible={isVisible}>
                <CCard className="mt-3">
                  <CCardBody>
                    Element {index + 1} Content
                  </CCardBody>
                </CCard>
              </CCollapse>
            </CCol>
          </CRow>
        </div>
      ))}
    </>
  );
}

export default MultipleCollapses;
