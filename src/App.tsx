import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import VersionA from './VersionA';
import VersionB from './VersionB';
import { Survey } from './Survey';
import './App.css';

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

function App() {
  const isMobile = useIsMobile();

  // Instructions block styling
  const instructionsStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "#edf6ff",
    color: "#222",
    border: "2px solid #333333",
    padding: "1rem",
    textAlign: "center",
    fontWeight: 500,
    fontSize: isMobile ? "1rem" : "1.15rem",
    letterSpacing: "0.02em",
  };

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
          {/* Instructions block element */}
          <div style={instructionsStyle}>
            Please compare the layouts of <strong>Version A</strong> and <strong>Version B</strong> below.<br />
            Scroll down to complete the survey and help us improve!
          </div>
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
                ...(isMobile
                  ? { border: '2px solid #0352fc' }
                  : {
                    borderLeft: '2px solid #333333',
                    borderRight: '2px solid #333333',
                    borderBottom: '2px solid #333333',
                  }),
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
                ...(isMobile
                  ? { border: '2px solid #fc0345' }
                  : {
                    borderRight: '2px solid #333333',
                    borderBottom: '2px solid #333333',
                  }),
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
              borderLeft: !isMobile ? '2px solid #333333' : undefined,
              borderBottomLeftRadius: '8px',
              borderRight: !isMobile ? '2px solid #333333' : undefined,
              borderBottomRightRadius: '8px',
              borderBottom: !isMobile ? '2px solid #333333' : undefined,
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