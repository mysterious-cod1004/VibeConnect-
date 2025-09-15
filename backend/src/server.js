import express from 'express';

import {ENV} from '../config/env.js';
import { inngest, functions } from '../config/inngest.js';
import { serve } from 'inngest/express';

import { connectDB } from '../config/db.js';
import { clerkMiddleware } from '@clerk/express';

const app= express();
app.use(clerkMiddleware());
app.use(express.json());
// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));
app.get('/',(req,res)=>{
    res.send("Hello World");
});

// app.listen(ENV.PORT,()=>{
//     console.log(`Server is running on port ${ENV.PORT}`);
//     connectDB();
// });

const startServer = async () => {//vercel doesnt use app.listen so we need to connectDB before starting the server//first problem arrived here 
    try {
      await connectDB();
      if(ENV.NODE_ENV !== "production"){
      app.listen(ENV.PORT, () => {
        console.log(`Server is running on port ${ENV.PORT}`);
      });
    }
    } catch (error) {
      console.error('Failed to start server:', error);
        process.exit(1);
    }
  };
   startServer();
export default app;