import React, { useState } from 'react';
import axios from 'axios';

export const Search = (props) => {
    const [insertdata, setData] = useState([]); // Initialize as an array
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    // Sample locations for the dropdown
    const locations = ['socket 1', 'socket 2', 'socket 3', 'socket 4'];

    // Handle date selection
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    // Handle location selection
    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    // Handle form submission
    const disp = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const [year, month, day] = selectedDate.split('-');
        const formattedDate = `${day}/${month}/${year}`;        
        console.log('Formatted Date:', formattedDate);
        console.log('Selected Location:', selectedLocation);

        try {
            const response = await axios.post('http://localhost:5000/api/dates', {
                date: formattedDate,
                location: selectedLocation, // Pass the selected location
            });
            setData(response.data); // Set the response data directly
            console.log('Fetched trips:', response.data);
        } catch (error) {
            console.error('Error sending date:', error);
        }
    };

    return (
        <div style={{
            backgroundColor: props.bodymode,
            width: '100vw',
            height: '100vh'
        }}>
            <br /><br />
            <center>
                <div style={{
                    backgroundColor: props.bodymode,
                    width: '400px',
                    height: '50px'
                }}>
                    <form className="d-flex" onSubmit={disp}>
                        <input
                            className="form-control me-2"
                            type='date'
                            placeholder="Select Date"
                            aria-label="Search"
                            onChange={handleDateChange} // Capture date input
                        />
                        <select
                            className="form-control me-2"
                            onChange={handleLocationChange} // Capture location input
                            value={selectedLocation}
                        >
                            <option value="">Select a location</option>
                            {locations.map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Submit</button> {/* Add a submit button */}
                    </form>
                </div>
                <div className="overflow-auto border p-3" style={{
                    backgroundColor: "grey",
                    width: '450px',
                    maxHeight: '300px'
                }}>
                    {insertdata.length > 0 ? (
                        insertdata.map((trip, index) => (
                            <div key={trip.id || index}>
                                {trip._id + "  " + trip.time + "  " + trip.date}
                            </div>
                        ))
                    ) : (
                        <div>No trips found.</div>
                    )}
                </div>
            </center>
        </div>
    );
};
