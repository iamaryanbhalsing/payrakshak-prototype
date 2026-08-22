import express from 'express';
import cors from 'cors';
import { analyzeRouter } from './routes/analyze';
import { reportRouter } from './routes/report';
import { ivrRouter } from './routes/ivr';
import { benchmarkRouter } from './routes/benchmark';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'PayRakshak - Smart Shield Against UPI Scams',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/analyze', analyzeRouter);
app.use('/api/report', reportRouter);
app.use('/api/ivr', ivrRouter);
app.use('/api/benchmark', benchmarkRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🛡️  PayRakshak Backend Service running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🚀 Benchmark Endpoint: http://localhost:${PORT}/api/benchmark/run`);
});
