import React, { FC } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  Container,
  Stack,
} from '@mui/material';

// MUI icons (placeholders for FB/Google Ads):
import FacebookIcon from '@mui/icons-material/Facebook';
import AdUnitsIcon from '@mui/icons-material/AdUnits'; // example for Google Ads
import AdIntegrationGraphic from './ad-graphic';

const AutomatedMarketingSection: FC = () => {
  return (
    <Box sx={{ backgroundColor: '#F8FAF8', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          {/* LEFT COLUMN: White card with green behind it */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: { xs: 2, md: 4 },
            }}
          >
            {/* Green box behind the card */}
            {/* <Box
              sx={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                width: '300px',
                height: '200px',
                background: 'linear-gradient(135deg, #0E6537 0%, #1B5E20 100%)',
                borderRadius: 4,
                zIndex: 1,
              }}
            /> */}
            {/* White card */}
            <Box sx={{ mt: 6 }}>
                <AdIntegrationGraphic />
            </Box>
          </Grid>

          {/* RIGHT COLUMN: Text about minimal input, AI campaign creation */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pl: { xs: 0, md: 4 },
              mt: { xs: 4, md: 0 },
            }}
          >
            <Chip
              label="AI Marketing"
              sx={{
                backgroundColor: '#E6F5EC',
                color: '#0E6537',
                fontWeight: 'bold',
                mb: 2,
                alignSelf: 'flex-start',
              }}
            />

            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#0E6537',
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Automated Campaigns
            </Typography>

            <Typography variant="body1" sx={{ color: '#2A2A2A', mb: 3 }}>
              Provide minimal inputs—like location, budget, and property details—
              and let our AI create a full marketing campaign. We’ll deploy it,
              monitor performance, and optimize continuously. All for pennies on
              the dollar.
            </Typography>

            <Typography variant="body1" sx={{ color: '#2A2A2A', mb: 3 }}>
              We integrate seamlessly with:
            </Typography>

            {/* Row of icons (Facebook, Google, etc.) */}
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FacebookIcon sx={{ color: '#4267B2' }} />
                <Typography variant="body2">Facebook Ads</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AdUnitsIcon sx={{ color: '#4285F4' }} />
                <Typography variant="body2">Google Ads</Typography>
              </Box>
              {/* Add more icons (Instagram, LinkedIn, etc.) as needed */}
            </Stack>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0E6537',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 'bold',
                width: 'fit-content',
                '&:hover': {
                  backgroundColor: '#1B5E20',
                },
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AutomatedMarketingSection;
