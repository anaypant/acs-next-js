'use client';

import React, { FC } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link, // or use next/link if in Next.js
} from '@mui/material';

import ConversationManagementSection from './page-expenses';
import AutomatedMarketingSection from './page-marketing';

const FeaturesBody: FC = () => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* SECTION 1: Dark Gradient Hero */}
      <Box
        className="feature-box"
        sx={{
          background: '#003623',
          color: '#fff',
          py: { xs: 6, md: 10 },
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            {/* LEFT COLUMN: "ACS Features" + Lorem Ipsum */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  lineHeight: 1.2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                ACS Features
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: '500px', mb: 3 }}>
                Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
                ipsum lorem ipsum
              </Typography>
            </Grid>

            {/* RIGHT COLUMN: Images */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ position: 'relative', minHeight: '250px' }}
            >
              {/* Example floating images; adjust positions/sizes as needed */}
              <Box
                component="img"
                src="/images/fruit.png"
                alt="Fruit Example"
                sx={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: { xs: '120px', md: '150px' },
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                }}
              />
              <Box
                component="img"
                src="/images/save-segment.png"
                alt="Save Segment"
                sx={{
                  position: 'absolute',
                  bottom: '0',
                  right: { xs: '0', md: '20%' },
                  width: { xs: '180px', md: '250px' },
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                }}
              />
            </Grid>
          </Grid>
          {/* Glassmorphism Boxes */}
            <Grid container spacing={4} sx={{ mt: 4 }}>
                {[1, 2, 3].map((item) => (
                <Grid item xs={12} md={4} key={item}>
                    <Box
                    sx={{
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                    >
                    <Box
                        component="img"
                        src={`/icons/icon-${item}.png`}
                        alt={`Icon ${item}`}
                        sx={{ width: '32px', height: '32px', mb: 2 }}
                    />
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', mb: 1 }}
                    >
                        Title {item}
                    </Typography>
                    <Typography variant="body2">
                        This is a description for box {item}. Add relevant content here.
                    </Typography>
                    </Box>
                </Grid>
                ))}
            </Grid>
        </Container>
      </Box>

      <ConversationManagementSection />
      <AutomatedMarketingSection />
      {/* SECTION 2: Pricing Prediction (Left: Gradient, Right: White) */}
      <Box>
        <Grid container>
          {/* LEFT HALF: Dark gradient background (no content or decorative) */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: 'linear-gradient(to right, #0E6537, #2E7D32)',
              minHeight: { xs: '200px', md: '300px' },
            }}
          />
          {/* RIGHT HALF: White background with text */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: '#fff',
              color: '#2A2A2A',
              p: { xs: 4, md: 6 },
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', mb: 2, color: '#0E6537' }}
            >
              Pricing Prediction
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Create stunning, professional-looking social content with the
              Untitled App. Choose from hundreds of templates and unique filters,
              fonts, and stickers.
            </Typography>
            <Link
              href="#"
              underline="none"
              sx={{
                color: '#0E6537',
                fontWeight: 'bold',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              LEARN MORE
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* SECTION 3: Virtual Staging (Left: White, Right: Gradient) */}
      <Box>
        <Grid container>
          {/* LEFT HALF: White background with text */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: '#fff',
              color: '#2A2A2A',
              p: { xs: 4, md: 6 },
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', mb: 2, color: '#0E6537' }}
            >
              Virtual Staging
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
              ipsum lorem ipsum.
            </Typography>
            <Link
              href="#"
              underline="none"
              sx={{
                color: '#0E6537',
                fontWeight: 'bold',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              LEARN MORE
            </Link>
          </Grid>

          {/* RIGHT HALF: Dark gradient background (no content or decorative) */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: 'linear-gradient(to right, #0E6537, #2E7D32)',
              minHeight: { xs: '200px', md: '300px' },
            }}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default FeaturesBody;
