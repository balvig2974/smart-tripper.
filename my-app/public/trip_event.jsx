import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ThemeContext } from './themeprovider';

export const TripEvent = () => {
  const [dataval, setDataval] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [val, setVal] = useState("");
  const [currentTripKey, setCurrentTripKey] = useState("");
  const [alertData, setAlertData] = useState({ message: "", show: false });

  const fetchData = async () => {
    try {
      const response = await axios.get('https://smart-tripper-2000.onrender.com/tripdetails/data');
      setDataval(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Check for null status in the fetched data
    if (Object.values(dataval).some(item => item.status === 'null')) {
      setAlertData({ message: "Trip occurred", show: true });
    }
  }, [dataval]); // Run this effect whenever 'data' changes

  const handleSaveChanges = async () => {
    setShowModal(false);
    try {
      const response = await axios.post('http://localhost:5000/update-status', { val, tripkey: currentTripKey });
      console.log(response.data);
      setAlertData({ message: "", show: false });
      setVal(""); // Clear the input after saving
    } catch (error) {
      console.error('Error updating status:', error);
      setAlertData({ message: "Error updating status!", show: true });
    }
  };

  const handleAlertChange = () => {
    setAlertData({ ...alertData, show: false });
  };

  const entries = Object.entries(dataval);

  return (
    <>
      <AlertComponent message={alertData.message} show={alertData.show} onClose={handleAlertChange} />
      <div style={{ width: "100vw", height: "100vh", padding: '20px', overflowY: 'auto' }}>
        {entries.length > 0 ? (
          entries.map(([key, value], index) => (
            <div key={key || index} style={{ paddingBottom: '10px' }}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapse${index}`}
                    style={{ padding: '10px', borderRadius: '10px' }}
                  >
                    Trip no: {key}
                  </button>
                </h2>
                <div
                  id={`flush-collapse${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body" style={{ padding: '10px' }}>
                    <div>
                      {typeof value === 'object' ? (
                        Object.entries(value).map(([subKey, subValue]) => {
                          if (subKey === '__v') {
                            return null;
                          }
                          return (
                            <div
                              key={subKey}
                              style={{
                                margin: '10px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                backgroundColor: '#6c757d'
                              }}
                            >
                              <strong>{subKey}: </strong>{subValue}
                            </div>
                          );
                        })
                      ) : (
                        <div
                          style={{
                            marginBottom: '10px',
                            padding: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            backgroundColor: 'grey'
                          }}
                        >
                          {value}
                        </div>
                      )}
                    </div>
                    {value.status === 'null' && (
                      <div>
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setCurrentTripKey(value._id);
                          }}
                          className="btn btn-warning"
                          style={{
                            borderRadius: '5px',
                            padding: '10px 15px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            marginTop: '10px',
                            cursor: 'pointer'
                          }}
                        >
                          Update
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}

        {/* Modal for updating status */}
        <Modal show={showModal} onHide={() => setShowModal(false)} className="bg-dark text-light">
          <Modal.Header closeButton>
            <Modal.Title>Update Status</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-light text-dark">
            <input
              type="text"
              className="form-control bg-light text-dark border"
              placeholder="Enter status"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleSaveChanges}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

const AlertComponent = ({ message, show, onClose }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    show && (
      <div className={`alert ${isDarkMode ? 'alert-dark' : 'alert-light'}`} role="alert" style={{position:'sticky'}}>
        {message}
        <button 
          onClick={onClose}
          className="btn-close position-absolute top-0 end-0" 
          aria-label="Close"
        ></button>
      </div>
    )
  );
};
