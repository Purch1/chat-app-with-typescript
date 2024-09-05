import http from 'http';

import app from './app';
import { connectDatabse } from '@src/infrastructure/database/monogooseConfig';

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

connectDatabse();

server.listen(PORT, () => {
  console.log(`Server runnnig on port ${PORT}`);
});
