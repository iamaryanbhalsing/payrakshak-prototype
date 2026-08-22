"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const analyze_1 = require("./routes/analyze");
const report_1 = require("./routes/report");
const ivr_1 = require("./routes/ivr");
const benchmark_1 = require("./routes/benchmark");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
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
app.use('/api/analyze', analyze_1.analyzeRouter);
app.use('/api/report', report_1.reportRouter);
app.use('/api/ivr', ivr_1.ivrRouter);
app.use('/api/benchmark', benchmark_1.benchmarkRouter);
// Start server
app.listen(PORT, () => {
    console.log(`🛡️  PayRakshak Backend Service running on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🚀 Benchmark Endpoint: http://localhost:${PORT}/api/benchmark/run`);
});
