import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/routes';

const PORT = '3000';

const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:8080'],
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server started on: http://localhost:${PORT}`);
});
