import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import './App.css'; // Import the custom CSS

const APITable = () => {
  const [data, setData] = useState([]);  // State to hold data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // State to hold error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:3443/api/call-api');
        console.log('Fetched data:', response.data);  // Log fetched data
        setData(response.data.data || response.data);  // Adjust based on API structure
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');  // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();  // Call the fetch function
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Loading state
  }

  if (error) {
    return <div>{error}</div>;  // Display error message
  }

  // Dynamically create columns
  const columns = Object.keys(data[0] || {}).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    flex: 1,
  }));

  return (
    <div className="data-grid-container">
      <DataGrid
        rows={data}  // Data from the backend
        columns={columns}  // Column definitions
        pageSize={5}  // Pagination: 5 rows per page
        getRowId={(row) => row._id}  // Use _id as the unique row ID
        autoHeight  // Automatically adjust height based on content
      />
    </div>
  );
};

export default APITable;  // Fixed the export statement
