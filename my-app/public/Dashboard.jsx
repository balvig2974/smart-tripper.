import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import GaugeChart from 'react-gauge-chart';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';

const GaugeMeter = ({ value, maxValue }) => {
  const percentage = value / maxValue;

  return (
    <div style={{ backgroundColor: '#e0f7fa', borderRadius: '8px', padding: '5px' }}>
      <GaugeChart 
        id="gauge-chart"
        nrOfLevels={30} 
        arcsLength={[0.2, 0.6, 0.2]} 
        colors={['#FFA500', '#00FF00', '#FF0000']}
        percent={percentage}
        style={{ height: '30%', width: '100%' }}
        arcPadding={0.02}
        cornerRadius={10}
        hideText={true}
      />
      <h4 style={{ textAlign: 'center', color: '#000', fontSize: '14px' }}>Voltage: {value} V / {maxValue} V</h4>
    </div>
  );
};

const Dashboard = () => {
  const maxGaugeValue = 300;
  const [lineChartData1, setLineChartData1] = useState([]);
  const [lineChartData2, setLineChartData2] = useState([    { time: '2023-10-24 10:00', current: 10 },
    { time: '2023-10-24 10:05', current: 11 },
    { time: '2023-10-24 10:10', current: 12 },
    { time: '2023-10-24 10:15', current: 11.5 },
    { time: '2023-10-24 10:20', current: 13 },
    { time: '2023-10-24 10:25', current: 12.8 },
    { time: '2023-10-24 10:30', current: 14 },
    { time: '2023-10-24 10:35', current: 15 },
    { time: '2023-10-24 10:40', current: 14.5 },
    { time: '2023-10-24 10:45', current: 16 },]);

  const [selectedSocket, setSelectedSocket] = useState('socket 1');
  const [selectedTripper, setSelectedTripper] = useState('tripper 1');
  const [current, setCurrent] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [intervalId, setIntervalId] = useState(null); // To store the interval ID

  // Function to fetch data based on selected socket and tripper
  const fetchData = async () => {
    const data = {
      socket: selectedSocket,
      tripper: selectedTripper,
    };

    try {
      const response = await axios.post('http://localhost:5000/disp_pzem-data', data);
      setLineChartData1(response.data.voltages);
      setLineChartData2(response.data.currents);
      setCurrent(response.data.current);
      setVoltage(response.data.voltage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Start fetching data at an interval of 3 seconds
  const startFetchingData = () => {
    fetchData(); // Call it immediately first
    const id = setInterval(fetchData, 10000); // Set interval to call fetchData every 3 seconds
    setIntervalId(id); // Store the interval ID
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div>
      <br />
      <div className="mb-3 text-center"><h4>select the socket and tripper to view their data</h4>
        <Dropdown className="d-inline mx-2" onSelect={(eventKey) => setSelectedSocket(eventKey)}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedSocket}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="socket 1">Socket 1</Dropdown.Item>
            <Dropdown.Item eventKey="socket 2">Socket 2</Dropdown.Item>
            <Dropdown.Item eventKey="socket 3">Socket 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="d-inline mx-2" onSelect={(eventKey) => setSelectedTripper(eventKey)}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedTripper}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="tripper 1">Tripper 1</Dropdown.Item>
            <Dropdown.Item eventKey="tripper 2">Tripper 2</Dropdown.Item>
            <Dropdown.Item eventKey="tripper 3">Tripper 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="primary" onClick={startFetchingData} disabled={!selectedSocket || !selectedTripper}>
          Get Data
        </Button>
      </div>

      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={8} sm={6} md={4} lg={4} className="mb-4">
            <div style={{ backgroundColor: '#20c997', padding: '20px', borderRadius: '8px' }}>
              <h2 style={{ textAlign: 'center', color: '#fff', fontSize: '18px' }}>Voltage Reading</h2>
              <GaugeMeter value={voltage} maxValue={maxGaugeValue} />
            </div>
          </Col>
          <Col xs={8} className="mb-4">
            <div style={{ backgroundColor: '#28a745', padding: '10px', borderRadius: '8px' }}>
              <h2 style={{ textAlign: 'center', color: '#fff', fontSize: '18px' }}>Current Chart</h2>
              <div style={{ backgroundColor: '#f0f8ff', borderRadius: '8px', padding: '5px', marginTop: '10px' }}>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={lineChartData2}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="current" stroke="#ffcc00" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
     
          <Col xs={12} sm={10} md={6} lg={6} className="mb-4">
            <div style={{ backgroundColor: '#007bff', padding: '10px', borderRadius: '8px' }}>
              <h2 style={{ textAlign: 'center', color: '#fff', fontSize: '18px' }}>Voltage Chart</h2>
              <div style={{ backgroundColor: '#e0f7fa', borderRadius: '8px', padding: '5px', marginTop: '10px' }}>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={lineChartData1}>
                    <XAxis dataKey="time" />
                    <YAxis/>
                    <Tooltip />
                    <Line type="monotone" dataKey="voltage" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>

          <Col xs={6} className="mb-4">
            <Row className="justify-content-center">
              <Col xs={5} className="mx-2" style={{ backgroundColor: '#ffc107', padding: '10px', borderRadius: '8px' }}>
                <h4 style={{ textAlign: 'center', color: '#000' }}>Power</h4>
                <h5 style={{ textAlign: 'center', color: '#000' }}>{voltage*current} W</h5>
              </Col>
              
            </Row>
          </Col>

        
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
