import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import VersionA from './VersionA';
import VersionB from './VersionB';
import Survey from './Survey';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            maxWidth: '100vw',
            overflowX: 'hidden',
            backgroundColor: '#c0c2c4',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              backgroundColor: '#fff',
            }}
          >
            <div
              className="version-container"
              style={{
                flex: 1,
                borderLeft: '2px solid #333333',
                borderRight: '2px solid #333333',
                borderBottom: '2px solid #333333',
                minWidth: 0,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflowX: 'hidden',
              }}
            >
              <VersionA />
            </div>
            <div
              className="version-container"
              style={{
                flex: 1,
                minWidth: 0,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                // height: '100vh',          // keep this if you want full height, just remove overflow-y
                position: 'relative',
                // overflowY: 'auto',        // <-- removed as requested
                overflowX: 'hidden',
                borderRight: '#333333 2px solid',
                borderBottom: '#333333 2px solid',
              }}
            >
              <VersionB />
            </div>
          </div>
          <div
            style={{
              borderLeft: '2px solid #333333',
              borderBottomLeftRadius: '8px',
              borderRight: '2px solid #333333',
              borderBottomRightRadius: '8px',
              borderBottom: '2px solid #333333',
              maxWidth: '1200px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            <Survey />
          </div>
        </div>
      </ShoppingCartProvider>
    </AuthProvider>
  );
}

export default App;