import app from './app';
import { config } from './config';

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});
