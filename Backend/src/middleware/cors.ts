import { Request, Response, NextFunction } from 'express';

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Allow all origins (you can restrict this to specific domains in production)
  res.header("Access-Control-Allow-Origin", "*");
  
  // Allow specific headers
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma");
  
  // Allow specific HTTP methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
  
  // Allow credentials if needed
  res.header("Access-Control-Allow-Credentials", "true");
  
  // Set cache control for preflight requests
  res.header("Access-Control-Max-Age", "86400"); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
}; 