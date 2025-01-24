'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import { Box, Typography, Button, Container, Grid, Card, CardContent, TextField } from '@mui/material';

export default function LandingPage() {
    const [searchPlaceholder, setSearchPlaceholder] = useState('');
    const searchSuggestions = [
        'AI tools for real estate',
        'Streamline your workflow',
        'Predictive analytics',
        'Effortless communication',
        'Seamless CRM integrations',
    ];
    let suggestionIndex = 0;

    useEffect(() => {
        const cyclePlaceholders = () => {
            setSearchPlaceholder(searchSuggestions[suggestionIndex]);
            suggestionIndex = (suggestionIndex + 1) % searchSuggestions.length;
        };
        const interval = setInterval(cyclePlaceholders, 2000); // Change every 2 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'rgb(18, 20, 35)', color: 'rgb(210, 210, 230)' }}>
            <Navbar />

            {/* Hero Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    minHeight: '90vh',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Layered Background Effects */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-20%',
                        left: '-20%',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(233,69,96,0.8) 0%, rgba(130,160,255,0) 70%)',
                        filter: 'blur(150px)',
                        zIndex: 0,
                    }}
                ></Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-15%',
                        right: '-15%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(130,160,255,0.8) 0%, rgba(233,69,96,0) 70%)',
                        filter: 'blur(150px)',
                        zIndex: 0,
                    }}
                ></Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '10%',
                        left: '25%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(233,69,96,0) 70%)',
                        filter: 'blur(100px)',
                        zIndex: 0,
                    }}
                ></Box>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{
                            mb: 3,
                            fontSize: { xs: '2rem', md: '3.5rem' },
                            background: 'linear-gradient(to right, rgb(130, 160, 255), rgb(233, 69, 96))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Transform Your Real Estate Business
                    </Typography>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 4,
                            maxWidth: '600px',
                            mx: 'auto',
                            color: 'rgb(190, 190, 210)',
                        }}
                    >
                        Empowering realtors with cutting-edge AI solutions for analytics, communication, and efficiency.
                    </Typography>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <Box
                        sx={{
                            mb: 4,
                            maxWidth: '600px',
                            mx: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            borderRadius: '50px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                            background: 'linear-gradient(to right, rgb(55, 56, 75), rgb(65, 66, 85))',
                        }}
                    >
                        <TextField
                            variant="standard"
                            placeholder={searchPlaceholder}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            sx={{
                                flex: 1,
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: 'rgb(210, 210, 230)',
                                background: 'transparent',
                                '&::placeholder': { color: 'rgb(160, 160, 180)', opacity: 1 },
                                '& input': { textAlign: 'center' },
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                color: 'white',
                                background: 'linear-gradient(to right, rgb(130, 160, 255), rgb(233, 69, 96))',
                                boxShadow: '0 4px 15px rgba(233, 69, 96, 0.5)',
                                transition: 'transform 0.2s ease',
                                '&:hover': {
                                    background: 'linear-gradient(to right, rgb(150, 180, 255), rgb(255, 90, 120))',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            Search
                        </Button>
                    </Box>
                </motion.div>
            </Box>

            {/* Features Section */}
            <Container id="features" sx={{ py: 8 }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ mb: 6, color: 'rgb(130, 160, 255)' }}
                >
                    Features
                </Typography>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <Card
                                    sx={{
                                        bgcolor: 'rgb(55, 56, 75)',
                                        color: 'rgb(210, 210, 230)',
                                        p: 2,
                                        borderRadius: 2,
                                        '&:hover': { boxShadow: '0px 4px 20px rgba(233, 69, 96, 0.5)' },
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                            gutterBottom
                                            sx={{ color: 'rgb(130, 160, 255)' }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body1">{feature.description}</Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Footer */}
            <Footer />
        </Box>
    );
}

const features = [
    {
        title: 'AI-Powered Design',
        description: 'Generate stunning designs with minimal effort.',
    },
    {
        title: 'Real-Time Collaboration',
        description: 'Work with your team in a synchronized environment.',
    },
    {
        title: 'Seamless Deployment',
        description: 'Publish your site directly with one click.',
    },
];

function Footer() {
    return (
        <Box sx={{ py: 6, bgcolor: 'rgb(65, 66, 85)', color: 'rgb(160, 160, 180)' }}>
            <Container>
                <Typography textAlign="center">© {new Date().getFullYear()} ACS. All rights reserved.</Typography>
            </Container>
        </Box>
    );
}
