import React from "react";
import {useNavigate } from "react-router-dom";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CBadge,
  
} from "@coreui/react";

const SuccessModel = ({show, setShowModal,clientcount,updateClientData}) => {
  const navigate = useNavigate();
  const removeLocalStorage = ()=>{
    updateClientData([])
    localStorage.removeItem('clientsdata');
    navigate('/');
  }
  
  return (
    <>
      <CModal
        alignment="center"
        visible={show}
        onClose={() => { setShowModal(false);removeLocalStorage()} }  backdrop={'static'}
      >
        <CModalHeader>
          <CModalTitle>Submission Successful!</CModalTitle>
        </CModalHeader>
        <CModalBody>
          You are <CBadge color="secondary" size="xl">{clientcount}</CBadge> in the row. Please be patient  and wait for your turn. We will get to you soon!!
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() =>{setShowModal(false);removeLocalStorage();}}>
            Proceed Next
          </CButton>
         
        </CModalFooter>
      </CModal>
    </>
  );
};

export default SuccessModel;
