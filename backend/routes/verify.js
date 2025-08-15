const { request } = require('express');
const jwt = require('jsonwebtoken');

// Your secret key or public key (depending on how the token is signed)
const SECRET_KEY = 'secret'; // Replace with your actual secret

// Function to verify a token
function verifyToken(token) {
    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        request.user = decoded
        console.log('Token is valid:', decoded);
        return { valid: true, decoded };
    } catch (error) {
        console.error('Invalid token:', error.message);
        return { valid: false, error: error.message };
    }
}

// Example usage
const token = 'your-jwt-token-here'; // Replace with the token you want to verify
const result = verifyToken(token);

if (result.valid) {
    console.log('Decoded payload:', result.decoded);
} else {
    console.log('Token verification failed:', result.error);
}
