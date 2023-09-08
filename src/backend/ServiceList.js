import React, { useContext, useState } from 'react';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from "@coreui/react";
import axios from '../api/axios';
import Datacontext from "../components/Datacontext";

function ServiceList({ services }) {
  const { fetchQueData } = useContext(Datacontext);
  const [serviceData, setServiceData] = useState(services);

  const handleUpdateStatus = async (id, statusType) => {
    try {
      // Make a PUT request to update the status
      const response = await axios.put(`/dailyservice/update/${id}`, {
        status: statusType, // Use the provided statusType
      });

      // Update the serviceData state with the new status
      const updatedServiceData = serviceData.map((service) => {
        if (service.id === id) {
          return { ...service, status: response.data.DailyServices.status };
        }
        return service;
      });

      // Fetch updated data and set the state
      fetchQueData();
      setServiceData(updatedServiceData);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
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
              <CDropdown>
                <CDropdownToggle color="secondary">Action</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    onClick={() => handleUpdateStatus(service.id, "pending")}
                  >
                    Pending
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => handleUpdateStatus(service.id, "ongoing")}
                  >
                    On Going
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => handleUpdateStatus(service.id, "finished")}
                  >
                    Finished
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => handleUpdateStatus(service.id, "cancel")}
                  >
                    Cancelled
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ServiceList;
