import React from 'react';
import ReactDOM from 'react-dom/client';
import Draggable from './components/Draggable';
import Box from './components/Box';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Draggable>
      <Box />
    </Draggable>
  </React.StrictMode>
);