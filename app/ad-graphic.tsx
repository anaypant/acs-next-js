import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import './styles.css';

const AdIntegrationGraphic: FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 600,
        height: 400,
        margin: '0 auto',
      }}
    >
      {/* Inline keyframes for slower dash animation */}
      <style>
        {`
          @keyframes dashFlow {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -400;
            }
          }
        `}
      </style>

      {/* Center Node */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          backgroundColor: '#fff',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
          // Approximate width/height for consistent line origins
          width: 200,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0E6537' }}>
          Lead Generation Workflow
        </Typography>
      </Box>

      {/* Facebook (larger icon) */}
      <Box
        sx={{
          top: '15%',
          left: '10%',
          backgroundColor: '#4267B2',
        }}
        className="logo-circle"
      >
        <FacebookIcon sx={{ color: '#fff', fontSize: 32 }} />
      </Box>

      {/* Google (logo image instead of an MUI icon) */}
      <Box
        sx={{
          top: '15%',
          right: '10%',
          backgroundColor: '#fff', // or a Google-like color if you prefer
        }}
        className="logo-circle"
      >
        <GoogleIcon sx={{ color: '#4285F4', fontSize: 32 }} />
      </Box>

      {/* LinkedIn (larger icon) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          backgroundColor: '#0077B5',
        }}
        className="logo-circle"
      >
        <LinkedInIcon sx={{ color: '#fff', fontSize: 32 }} />
      </Box>

      {/* Twitter (larger icon) */}
      <Box
        sx={{
          backgroundColor: '#1DA1F2',
        }}
        className="logo-circle"
      >
        <TwitterIcon sx={{ color: '#fff', fontSize: 32 }} />
      </Box>

      {/* SVG for Curved, Dashed, Animated Lines
          We start from the left-middle or right-middle of the center box:
          - Left-middle approx. (200, 200)
          - Right-middle approx. (400, 200)
       */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {/* Facebook: from left-middle (200,200) to top-left (100,70) */}
        <path
          d="M200,200 C150,150 120,110 100,70"
          stroke="#ccc"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 6"
          style={{ animation: 'dashFlow 6s linear infinite' }}
        />

        {/* Google: from right-middle (400,200) to top-right (500,70) */}
        <path
          d="M400,200 C450,150 480,110 500,70"
          stroke="#ccc"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 6"
          style={{ animation: 'dashFlow 6s linear infinite' }}
        />

        {/* LinkedIn: from left-middle (200,200) to bottom-left (100,330) */}
        <path
          d="M200,200 C150,250 120,290 100,330"
          stroke="#ccc"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 6"
          style={{ animation: 'dashFlow 6s linear infinite' }}
        />

        {/* Twitter: from right-middle (400,200) to bottom-right (500,330) */}
        <path
          d="M400,200 C450,250 480,290 500,330"
          stroke="#ccc"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 6"
          style={{ animation: 'dashFlow 6s linear infinite' }}
        />
      </svg>
    </Box>
  );
};

export default AdIntegrationGraphic;
