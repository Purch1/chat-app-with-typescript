import http from 'http';
import app from './app';
import { connectDatabse } from '@src/infrastructure/database/monogooseConfig';

const server = http.createServer(app);

const PORT = process.env.PORT || 5001;

connectDatabse();

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }).on('error', (err: Error) => {
    console.error(`Failed to start server: ${err.message}`);
  });
