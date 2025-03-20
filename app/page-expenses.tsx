'use client';

import React, { FC } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useInView } from 'react-intersection-observer';

// -------------------------------------
//  Data
// -------------------------------------
interface Conversation {
  lead: string;
  date: string;
  stage: string;
  message: string;
}

const conversations: Conversation[] = [
  {
    lead: 'John Doe',
    date: 'Mar 18, 2025',
    stage: 'AI Engaged',
    message: 'Looking for a 3-bedroom home...',
  },
  {
    lead: 'Jane Smith',
    date: 'Mar 17, 2025',
    stage: 'Agent Hand-Off',
    message: 'Need more details on the neighborhood...',
  },
  {
    lead: 'Robert Brown',
    date: 'Mar 16, 2025',
    stage: 'AI Engaged',
    message: 'Interested in scheduling a tour...',
  },
  {
    lead: 'Linda Davis',
    date: 'Mar 15, 2025',
    stage: 'Closed',
    message: 'Thanks for your help!',
  },
  {
    lead: 'Linda Davis',
    date: 'Mar 15, 2025',
    stage: 'Closed',
    message: 'Thanks for your help!',
  },

];

// Map each stage to a default bubble color
const stageColors: Record<string, string> = {
  'AI Engaged': '#0E6537',      // Dark Green
  'Agent Hand-Off': '#FFA726',  // Orange
  'Closed': '#9E9E9E',          // Gray
};

// -------------------------------------
//  Stage Bubble with color animation
// -------------------------------------
interface StageBubbleProps {
  stage: string;
  animateOnView?: boolean;
}

const StageBubble: FC<StageBubbleProps> = ({ stage, animateOnView }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  // Default color for the stage
  const defaultColor = stageColors[stage] || '#0E6537';

  // Color when the bubble is in view (only for the stage we want animated)
  // Example: lighten the green or pick any highlight color
  const animatedColor = '#A5D6A7';

  // Decide which color to use
  const backgroundColor = animateOnView && inView ? animatedColor : defaultColor;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'inline-block',
        px: 1.5,
        py: 0.5,
        borderRadius: '12px',
        color: '#fff',
        backgroundColor,
        transition: 'background-color 1s ease',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
      }}
    >
      {stage}
    </Box>
  );
};

// -------------------------------------
//  Main Section Component
// -------------------------------------
const ConversationManagementSection: FC = () => {
  return (
    <Box sx={{ backgroundColor: '#F8FAF8', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container>
          {/* LEFT COLUMN: Text, bullet list, CTA */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              pr: { xs: 0, md: 4 },
              mb: { xs: 4, md: 0 },
            //   borderRight: { xs: 'none', md: '1px solid #E0E0E0' },
            }}
          >
            {/* Small label / Chip */}
            <Chip
              label="AI Communication"
              sx={{
                backgroundColor: '#E6F5EC',
                color: '#0E6537',
                fontWeight: 'bold',
                mb: 2,
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
              Conversation Management
            </Typography>

            <Typography variant="body1" sx={{ color: '#2A2A2A', mb: 3 }}>
              Automatically engage leads, handle routine questions, and
              intelligently escalate to a realtor when the time is right—
              powered by AI-driven conversation flows.
            </Typography>

            {/* Bullet List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
              {[
                'AI-Powered Engagement',
                'Real-Time Handoffs',
                'Unified Conversation View',
                'Intelligent Insights',
              ].map((feature, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon sx={{ color: '#0E6537' }} />
                  <Typography variant="body1" sx={{ color: '#0E6537' }}>
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0E6537',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#1B5E20',
                },
              }}
            >
              Learn More
            </Button>
          </Grid>

          {/* RIGHT COLUMN: Gradient background + Table */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
                position: 'relative',  // allows absolute positioning of the green box
                p: { xs: 2, md: 4 },
                borderRadius: { xs: 0, md: 2 },
                border: "none",
                // Any other existing styles you want to keep...
            }}>
            <Box
                sx={{
                position: 'absolute',
                top: '-10px',
                left: '4rem',
                width: '96%',
                height: '86%',
                background: 'linear-gradient(135deg, #0E6537 0%, #1B5E20 100%)',
                borderRadius: 4,
                zIndex: 1, // behind the card but above the background
                }}
            />
            <Paper
              elevation={3}
              sx={{
                // Lift the card up slightly
                position: 'relative',
                zIndex: 2,
                width: '100%',
                top: '-1rem',

                // Round corners and add a bigger shadow for a "floating" effect
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',

                p: 3,
                backgroundColor: '#fff',
                overflow: 'hidden', // just in case table overflows
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Recent Conversations
              </Typography>

              <Box
                sx={{
                    maxHeight: '400px', // Set the desired height for the scrollable area
                    overflow: 'auto', // Enable scrolling
                    border: 'none', // Optional: Add a border for better visibility
                    borderRadius: '8px', // Optional: Add rounded corners
                }}
                >
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        {['Lead', 'Date', 'Stage', 'Last Message'].map((col) => (
                        <TableCell
                            key={col}
                            sx={{
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            }}
                        >
                            {col}
                        </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {conversations.map((conv, idx) => (
                        <TableRow key={idx}>
                        {/* Lead */}
                        <TableCell
                            sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100px',
                            }}
                        >
                            {conv.lead}
                        </TableCell>

                        {/* Date */}
                        <TableCell
                            sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '80px',
                            }}
                        >
                            {conv.date}
                        </TableCell>

                        {/* Stage bubble with animation for "AI Engaged" */}
                        <TableCell>
                            <StageBubble
                            stage={conv.stage}
                            // Animate if the stage is "AI Engaged"
                            animateOnView={conv.stage === 'AI Engaged'}
                            />
                        </TableCell>

                        {/* Last Message */}
                        <TableCell
                            sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '140px',
                            }}
                        >
                            {conv.message}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ConversationManagementSection;
