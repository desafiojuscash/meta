import express from 'express'
import dotenv from 'dotenv';
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import caseRoutes from "./routes/case.js";
import cors from 'cors';
import { sequelize } from './models/index.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/v1/user', userRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/case', caseRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('Database sync error:', err));
