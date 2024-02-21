require('dotenv').config();

const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const port = process.env.PORT || 3000;
const cors = require('cors');
const rateLimit = require('express-rate-limit');



const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

// app.use(limiter);

app.use(express.json());

app.use(
  cors()
);

app.use('/user', userRouter);

app.all('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found :<' });
});

app.listen(port, () => {
  // console.log('Server is running on port', port);
});
