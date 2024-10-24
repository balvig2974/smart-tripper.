import React from 'react'
import Dashboard from './Dashboard';
export const Home = (props) => {
  return (
    <div  style={{
      backgroundColor: props.bodymode,
      width: '100vw',
      height: '100vh'}}>
      <Dashboard />
    </div>
  )
};

