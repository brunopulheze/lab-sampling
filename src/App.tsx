import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import VersionA from './VersionA';
import VersionB from './VersionB';
import { Survey } from './Survey';
import './App.css';

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth < 768
  );
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

function App() {
  const isMobile = useIsMobile();

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
              flexDirection: isMobile ? 'column' : 'row',
              flex: 1,
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              backgroundColor: '#fff',
            }}
          >
            {/* Version A label (mobile only) */}
            {isMobile && (
              <div
                style={{
                  width: "100%",
                  background: "#0352fc",
                  color: "#fff",
                  fontWeight: 700,
                  padding: "0.7rem 1rem",
                  fontSize: "1.15rem",
                  textAlign: "center",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  letterSpacing: "0.05em",
                }}
              >
                Version A
              </div>
            )}
            <div
              className="version-container"
              style={{
                flex: 1,
                minWidth: 0,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflowX: 'hidden',
                order: isMobile ? 1 : 0,
                borderLeft: isMobile ? undefined : '2px solid #333333',
                borderRight: isMobile ? undefined : '2px solid #333333',
                borderBottom: isMobile ? undefined : '2px solid #333333',
                borderTopLeftRadius: isMobile ? '8px' : undefined,
                borderTopRightRadius: isMobile ? '8px' : undefined,
              }}
            >
              <VersionA isMobile={isMobile} />
            </div>
            <div
              className="version-container"
              style={{
                flex: 1,
                minWidth: 0,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflowX: 'hidden',
                order: isMobile ? 2 : 0,
                borderRight: isMobile ? undefined : '#333333 2px solid',
                borderBottom: isMobile ? undefined : '#333333 2px solid',
              }}
            >
              {/* Version B label (mobile only, above VersionB content only) */}
              {isMobile && (
                <div
                  style={{
                    width: "100%",
                    background: "#fc0345",
                    color: "#fff",
                    fontWeight: 700,
                    padding: "0.7rem 1rem",
                    fontSize: "1.15rem",
                    textAlign: "center",
                    letterSpacing: "0.05em",
                  }}
                >
                  Version B
                </div>
              )}
              <VersionB isMobile={isMobile} />
            </div>
          </div>
          <div
            style={{
              borderLeft: isMobile ? undefined : '2px solid #333333',
              borderBottomLeftRadius: '8px',
              borderRight: isMobile ? undefined : '2px solid #333333',
              borderBottomRightRadius: '8px',
              borderBottom: isMobile ? undefined : '2px solid #333333',
              maxWidth: '1200px',
              margin: '0 auto',
              width: '100%',
              backgroundColor: '#fff',
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