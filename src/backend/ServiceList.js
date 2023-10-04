import React, { useContext, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,

} from "@coreui/react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom'

function ServiceList({ services,setnotification }) {
  const { auth } = useAuth();
  const [serviceData, setServiceData] = useState(services);
  const [subcategory, setSubcategory] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('')
  const [platform, setPlatform] = useState('')
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const access_token = auth.access_token;
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
 

  const handleUpdateStatus = async (id) => {
    try {
      // Make a PUT request to update the status
      const response = await axios.put(`/dailyservice/update/${data.id}`, {
        status,
        subcategory,
        comment,
        platform,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
      ).then((response) => {
         // Update the serviceData state with the new status
      const updatedServiceData = serviceData.map((service) => {
        if (service.id === id) {
          return { ...service, status: response.data.DailyServices.status };
        }
        return service;
      });

      setServiceData(updatedServiceData);
      setnotification("Client data Updated");
      setVisible(false);
      navigate('/login/clientservice')
      });
      

     

    } catch (error) {
      setValidated(true);
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {serviceData.map((service, serviceIndex) => (
            <tr key={serviceIndex}>
              <th scope="row">{serviceIndex + 1}</th>
              <td>
                <strong>{service.service}</strong>
              </td>
              <td>{service.status}</td>
              <td>
                <CButton onClick={() => {setVisible(!visible); setData({id:service.id,service:service.service})}}>
                 Action
                </CButton>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CModal
        size="lg"
        backdrop={"static"}
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
       
      >
        <CModalHeader>
          <CModalTitle>Service Setting ({data.service})</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3 needs-validation"  noValidate
                validated={validated}>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="validationDefault01"
                label="Service sub category"
                onChange={(e) => setSubcategory(e.target.value)}
                required
              />
            </CCol>
            <CCol md={3}>
              <CFormSelect id="validationDefault02" label="Platform" onChange={(e) => setPlatform(e.target.value)} required>
                <option disabled>Choose...</option>
                <option value="website">Website</option>
                <option value="groupon">Groupon</option>
                <option value="google">Google</option>
                <option value="facebook">facebook</option>
                <option value="tiktok">Tiktok</option>
                <option value="yelp">Yelp</option>
                <option value="other">Other</option>
              </CFormSelect>
            </CCol>                
            
            <CCol md={3}>
              <CFormSelect id="validationDefault03" label="Status" onChange={(e) => setStatus(e.target.value)} required>
                <option disabled>Choose...</option>
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="finished">Finished</option>
                <option value="cancel">Cancel</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
            <CFormTextarea
              id="service-detals"
              label="Service Details"
              rows={3}
              text="Must be 8-20 words long."
              onChange={(e) => setComment(e.target.value)}
            ></CFormTextarea>
            </CCol>
            
            <CCol xs={12}>
              <CButton color="primary" type="button"  onClick={handleUpdateStatus}>
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
}

export default ServiceList;
