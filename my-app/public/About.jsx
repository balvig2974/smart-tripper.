import React, { useContext } from 'react';
import { ThemeContext } from './themeprovider';

export const About = (props) => {
  const { isDarkMode } = useContext(ThemeContext); // Access the theme context

  return (
    <div style={{
      backgroundColor: props.bodymode,
      width: '100vw',
      height: '100vh',
      marginLeft: '1rem',
      padding: '2rem',
      boxSizing: 'border-box',
      fontFamily: '"Arial", sans-serif',
      color: isDarkMode ? '#f8f9fa' : '#333' // Change text color based on dark mode
    }}>
      <h2 style={{ textAlign: 'center' }}>Project Title: Smart Tripper</h2>
      <h4 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '0.5rem' }}>Introduction</h4>
      <p style={{ lineHeight: '1.6' }}>
        Welcome to Smart Tripper, an innovative electrical monitoring system designed for industrial environments. Our solution utilizes a reed switch and PZEM sensors to monitor electrical sockets in real-time, enabling quick identification of the causes behind electrical trips and enhancing operational safety.
      </p>

      <h4 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '0.5rem' }}>Project Overview</h4>
      <p style={{ lineHeight: '1.6' }}>
        Electrical trips can disrupt production and lead to costly downtime. Smart Tripper aims to mitigate these risks by providing a comprehensive monitoring system that alerts users to potential issues before they escalate. By combining the sensitivity of a reed switch with detailed data from PZEM sensors, we enable proactive management of electrical systems.
      </p>

      <h4 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '0.5rem' }}>Components Used</h4>
      <ul style={{ listStyleType: 'circle', marginLeft: '2rem', lineHeight: '1.6' }}>
        <li><strong>Reed Switch:</strong> Detects the tripper state in the main board, signaling when an electrical trip occurs.</li>
        <li><strong>PZEM Sensors:</strong> Installed in each socket, these sensors measure voltage, current, and power consumption, providing real-time data critical for analysis.</li>
        <li><strong>ESP Microcontroller:</strong> Serves as the central hub, collecting data from the reed switch and PZEM sensors, and facilitating communication with our web application.</li>
        <li><strong>React Web Application:</strong> A user-friendly interface that visualizes sensor data, provides alerts, and analyzes power consumption trends.</li>
      </ul>

      <h4 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '0.5rem' }}>How It Works</h4>
      <ol style={{ marginLeft: '2rem', lineHeight: '1.6' }}>
        <li><strong>Detection:</strong> The reed switch continuously monitors the tripper state. When a trip occurs, it signals the ESP microcontroller.</li>
        <li><strong>Data Collection:</strong> Concurrently, the PZEM sensors gather real-time data from each socket, including current and voltage readings.</li>
        <li><strong>Analysis:</strong> The ESP processes this data, identifying anomalies or overloads that may have triggered the trip.</li>
        <li><strong>User Alerts:</strong> Users receive immediate notifications through the React web application, enabling prompt responses to potential electrical hazards.</li>
      </ol>

      <h4 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '0.5rem' }}>Benefits</h4>
      <ul style={{ listStyleType: 'circle', marginLeft: '2rem', lineHeight: '1.6' }}>
        <li><strong>Enhanced Safety:</strong> Early detection of electrical issues helps prevent hazardous situations in the workplace.</li>
        <li><strong>Operational Efficiency:</strong> Monitoring usage patterns leads to better energy management and reduced operational costs.</li>
        <li><strong>User-Friendly Interface:</strong> The React application provides clear visualizations of data and timely alerts.</li>
      </ul>

      <h4 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '0.5rem' }}>Future Improvements</h4>
      <p style={{ lineHeight: '1.6' }}>
        We envision expanding Smart Tripper by integrating additional sensors to monitor the health of machines connected to the sockets. This enhancement will provide insights into machine performance, allowing for predictive maintenance and minimizing unexpected downtime.
      </p>

      <h4 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '0.5rem' }}>Conclusion</h4>
      <p style={{ lineHeight: '1.6' }}>
        Smart Tripper represents a significant advancement in industrial electrical management, empowering users to take control of their electrical environments and improve overall safety and efficiency.
      </p>
    </div>
  );
};
