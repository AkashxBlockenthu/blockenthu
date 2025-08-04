import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import serverless from 'serverless-http';
import appConfig from './config';
import { authMiddleware } from './middleware/auth';
import { corsMiddleware } from './middleware/cors';

// Import route handlers
import swapRoutes from './routes/swap';
import bridgeRoutes from './routes/bridge';
import chartRoutes from './routes/chart';
import historyRoutes from './routes/history';

const app = express();

// Security middleware - configure helmet to allow CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "unsafe-none" },
  crossOriginEmbedderPolicy: false
}));

// Logging middleware
if (appConfig.nodeEnv !== 'production') {
  app.use(morgan('dev'));
}

// CORS middleware - MUST be before routes
app.use(cors({
  origin: '*', // Allow all origins for now
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control', 'Pragma'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Also use custom CORS middleware for additional headers
app.use(corsMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Global OPTIONS handler for preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  res.header('Access-Control-Max-Age', '86400');
  res.status(200).end();
});

// Health check endpoint (no auth needed)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: appConfig.nodeEnv 
  });
});

// CORS test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'CORS test successful',
    timestamp: new Date().toISOString(),
    headers: req.headers
  });
});

// Public routes (no authentication required)
app.use('/api/swap', swapRoutes);
app.use('/api/chart', chartRoutes);
app.use('/api/bridge', bridgeRoutes);
app.use('/api/history', historyRoutes);

// Authentication middleware for protected route


// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: appConfig.nodeEnv === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server if not in serverless environment
if (appConfig.nodeEnv !== 'production') {
  app.listen(appConfig.port, () => {
    console.log(`Server running on port ${appConfig.port}`);
    console.log(`Environment: ${appConfig.nodeEnv}`);
  });
}

// Export for serverless
export const handler = serverless(app);
export default app; 