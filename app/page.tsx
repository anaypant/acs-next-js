'use client';

import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles.css'; // Adjust the path as necessary

// ----------------------------------------------------------------
//  NAVBAR (simplified inline, but feel free to use your own Navbar)
// ----------------------------------------------------------------
const NavBar: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'transparent',
        color: '#0E6537',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Brand */}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          ACS
        </Typography>

        {/* Right: Nav Items (hide if mobile, just as an example) */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography
              variant="body1"
              sx={{ cursor: 'pointer', '&:hover': { color: '#1B5E20' } }}
            >
              Home
            </Typography>
            <Typography
              variant="body1"
              sx={{ cursor: 'pointer', '&:hover': { color: '#1B5E20' } }}
            >
              Solutions
            </Typography>
            <Typography
              variant="body1"
              sx={{ cursor: 'pointer', '&:hover': { color: '#1B5E20' } }}
            >
              Case Studies
            </Typography>
            <Typography
              variant="body1"
              sx={{ cursor: 'pointer', '&:hover': { color: '#1B5E20' } }}
            >
              Contact
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#0E6537',
                color: '#0E6537',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(14, 101, 55, 0.04)',
                  borderColor: '#0E6537',
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0E6537',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1B5E20',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}

        {/* Mobile menu icon, if you want to handle a drawer, etc. */}
        {isMobile && (
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

// ----------------------------------------------------------------
//  ACCORDION ITEMS
// ----------------------------------------------------------------
const accordionItems = [
  {
    title: 'Pricing Prediction',
    content: 'Use AI-driven insights to forecast property values.',
  },
  {
    title: 'Virtual Staging',
    content:
      'Show potential buyers what a furnished property could look like—digitally!',
  },
  {
    title: 'Marketing Optimization',
    content: 'Reach the right audience with targeted, data-driven campaigns.',
  },
  {
    title: 'Automated Lead Scoring',
    content: 'Focus on high-value leads with an AI-prioritized approach.',
  },
  {
    title: 'Lorem Ipsum',
    content: 'Placeholder for additional or upcoming features.',
  },
];

// ----------------------------------------------------------------
//  MAIN LANDING PAGE
// ----------------------------------------------------------------
const LandingPage: FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      className="checkered-background"
    >
      {/* NavBar at top */}
      <NavBar />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, mt: -8 }}>
        <Grid container spacing={6} alignItems="center">
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                sx={{
                  // Overall text styling
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  lineHeight: 1.2,
                  color: '#002417',
                  // Green gradient fill
                  background: 'linear-gradient(to bottom,rgb(52, 193, 115) 0%, #002417 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',

                  // 3D-like offset shadow
                }}
              >
                {/* First word: bigger + italic */}
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    fontStyle: 'italic',
                    fontSize: '1.3em', // 30% bigger than the rest
                    mr: 1,            // small margin to separate from next word
                  }}
                >
                  Empowering
                </Box>

                {/* Remaining text (inherits the same gradient & shadow) */}
                Realtors with AI
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  mb: 4,
                  maxWidth: '90%',
                  color: '#2A2A2A',
                  fontSize: '1rem',
                }}
              >
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#0E6537',
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#1B5E20',
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>

            {/* Accordion List (Solutions) */}
            <Box sx={{ mt: 6 }}>
              {accordionItems.map((item, idx) => (
                <Accordion
                  key={idx}
                  expanded={expanded === item.title}
                  onChange={handleAccordion(item.title)}
                  sx={{ mb: 2, borderRadius: 1, boxShadow: 'none' }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#0E6537' }} />}
                    sx={{
                      backgroundColor: '#F8FAF8',
                      border: '1px solid #E0E0E0',
                      '& .MuiAccordionSummary-content': {
                        marginY: '12px',
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ color: '#0E6537' }}
                    >
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: '#FAFAFA',
                      borderLeft: '1px solid #E0E0E0',
                      borderRight: '1px solid #E0E0E0',
                      borderBottom: '1px solid #E0E0E0',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#444' }}>
                      {item.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>

          {/* RIGHT COLUMN (Phone images) */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                minHeight: '400px',
                height: 'auto',
              }}
            >
              {/* Phone Mockup 1 */}
              <Box
                component="img"
                src="/images/phone-1.png"
                alt="Dashboard 1"
                sx={{
                  width: { xs: '180px', md: '220px' },
                  position: 'absolute',
                  top: '20%',
                  left: '45%',
                  transform: 'translate(-110%, 0)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '20px',
                }}
              />

              {/* Phone Mockup 2 */}
              <Box
                component="img"
                src="/images/phone-2.png"
                alt="Dashboard 2"
                sx={{
                  width: { xs: '180px', md: '220px' },
                  position: 'absolute',
                  top: '10%',
                  left: '50%',
                  transform: 'translate(10%, 50%)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '20px',
                }}
              />

              {/* Empty box for spacing */}
              <Box sx={{ height: '500px' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer (placeholder). Use your own Footer component if desired. */}
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid #E0E0E0',
          textAlign: 'center',
          py: 2,
          mt: 4,
          color: '#666',
        }}
      >
        <Typography variant="caption">© {new Date().getFullYear()} ACS</Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
