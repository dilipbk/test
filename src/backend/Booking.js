// Booking.js
import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import {
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CAccordion,
  CForm,
  CFormInput,
  CButton,
} from "@coreui/react";
import DataContext from "../components/Datacontext";

const Booking = () => {
  const { auth } = useAuth();
  const {store_id} = useContext(DataContext);
  const access_token = auth.access_token;
  const [dateFrom, setDatefrom] = useState('');
  const [dateTo, setDateto] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    fetchData();
  }, []);



  const handleSearchSubmit = async (event) => {
    event.preventDefault() 
    // Handle form submission here, e.g., sending data to a server
    try {
      const response = await axios
        .get("/booking/search/"+dateFrom+'/'+dateTo+'/'+store_id, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          setData(response.data.Booking);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching booking list:", error);
    }
  }


  const fetchData = async () => {
    try {
      const response = await axios
        .get("/booking/"+store_id, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          setData(response.data.Booking);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching booking list:", error);
    }
  };
  const formatServices = (services) => {
    if (Array.isArray(services)) {
      return services.join(", ");
    }
    // Handle the case where services might be a JSON string
    try {
      const parsedServices = JSON.parse(services);
      if (Array.isArray(parsedServices)) {
        return parsedServices.join(", ");
      }
    } catch (error) {
      console.error(error);
    }
    return "N/A";
  };

  function formatDate(inputDate) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  }

  const formatTime = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    const date = new Date(0, 0, 0, hours, minutes, seconds);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString([], options);
  };

 
  return (
    <div>
      <div className="justify-content-between align-item-center d-flex mb-3">
      <h2>Bookings</h2> 
      <CForm className="d-flex" onSubmit={handleSearchSubmit}>
           <CFormInput type="date" className="me-2" placeholder="date from"  value={dateFrom}
                  onChange={(e) => setDatefrom(e.target.value)}
                  required />
            <CFormInput type="date" className="me-2" placeholder="date to"  value={dateTo}
                  onChange={(e) => setDateto(e.target.value)}
                  required />
            <CButton type="submit" color="success" variant="outline">
              Search
            </CButton>
          </CForm>
          </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {Object.keys(data).map((date,key) => (
            <React.Fragment key={date}>
             <CAccordion activeItemKey={key}>      
              {data[date].map((booking, index) => (
                <CAccordionItem itemKey={index} className="mb-3">
                  <CAccordionHeader>{formatDate(date)}</CAccordionHeader>
                  <CAccordionBody>
                    <table className="table">
                      {/* Table headers */}
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Contact</th>
                          <th>Service</th>
                          <th>Booking Date</th>
                          <th>Booking Time</th>
                          <th>Comment</th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody>
                        <tr key={booking.id}>
                          <td>{index + 1}</td>
                          <td>{booking.name}</td>
                          <td>{booking.email}</td>
                          <td>{booking.contact}</td>
                          <td>{formatServices(booking.service)}</td>
                          <td>{booking.book_date}</td>
                          <td>{formatTime(booking.book_time)}</td>
                          <td>{booking.comment || "N/A"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
              </CAccordion>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default Booking;
