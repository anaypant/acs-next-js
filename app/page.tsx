'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar'; // Adjust path if needed
import Footer from './components/Footer'; // Adjust path if needed
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  TextField,
} from '@mui/material';

export default function LandingPage() {
  // -------------------------------
  // 1) Rotating placeholder logic
  // -------------------------------
  const [searchPlaceholder, setSearchPlaceholder] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const searchSuggestions = [
    'AI tools for real estate',
    // "Streamline your workflow", 
    // ^^^^ Temporarily commented out: This suggestion was originally used to indicate enhancing workflow efficiency.
    'Predictive analytics',
    'Effortless communication',
    'Seamless CRM integrations',
  ];

  let suggestionIndex = 0;

  useEffect(() => {
    const cyclePlaceholders = () => {
      setIsVisible(false);
      setTimeout(() => {
        // setSearchPlaceholder(searchSuggestions[suggestionIndex]);
        // suggestionIndex = (suggestionIndex + 1) % searchSuggestions.length;
        // setIsVisible(true);
      }, 500);
    };

    const interval = setInterval(cyclePlaceholders, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        // Grid-like background
        backgroundColor: '#FFFFFF',
        backgroundImage:
          'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        color: '#2A2A2A',
      }}
    >
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4} alignItems="center">
          {/* LEFT COLUMN: Title, button, search bar, bullet points */}
          <Grid item xs={12} md={6}>
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' },
                  color: '#0E6537',
                }}
              >
                Empowering Realtors with AI
              </Typography>
            </motion.div>

            {/* "Get Started" Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button
                variant="contained"
                sx={{
                  mb: 4,
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  color: '#fff',
                  backgroundColor: '#2E7D32',
                  boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
                  '&:hover': {
                    backgroundColor: '#1B5E20',
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>

            {/* Rotating Placeholder Search Bar */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '2rem' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#F3F4F6',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                  maxWidth: '400px',
                  mb: 2,
                }}
              >
                <TextField
                  variant="standard"
                  placeholder={searchPlaceholder}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      px: 2,
                      py: 1,
                    },
                  }}
                  sx={{
                    flex: 1,
                    background: 'transparent',
                    '& input': {
                      color: '#333',
                      textAlign: 'left',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 0,
                    backgroundColor: '#0E6537',
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#0B4C2A',
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
            </motion.div> */}

            {/* Feature List */}
            <Box>
              {[
                'Pricing Prediction',
                'Virtual Staging',
                'Marketing Optimization',
                'Automated Lead Scoring',
                'Lorem Ipsum',
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: '#F8FAF8',
                    border: '1px solid #E0E0E0',
                    mb: 1.5,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: '#0E6537' }}
                  >
                    {item}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#0E6537' }}>
                    +
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* RIGHT COLUMN: Subtext above images and Phone Images */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              {/* Subtext in slight green color */}
              <Typography variant="h6" sx={{ color: '#388E3C' }}>
                Leverage AI to generate real-time business solutions and make
                informed decisions faster than ever.
              </Typography>
            </Box>

            <Box sx={{ position: 'relative', textAlign: 'center' }}>
              {/* First phone image */}
              <Box
                component="img"
                src="/images/phone-1.png"
                alt="Dashboard example 1"
                sx={{
                  width: '220px',
                  height: 'auto',
                  position: 'absolute',
                  top: '20%',
                  left: '50%',
                  transform: 'translate(-110%, -10%)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '20px',
                }}
              />
              {/* Second phone image */}
              <Box
                component="img"
                src="/images/phone-2.png"
                alt="Dashboard example 2"
                sx={{
                  width: '220px',
                  height: 'auto',
                  position: 'absolute',
                  top: '10%',
                  left: '50%',
                  transform: 'translate(10%, 30%)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '20px',
                }}
              />
              {/* Invisible spacer to push container height */}
              <Box sx={{ height: '450px' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
