const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/save', (req, res) => {
  const data = req.body.data;

  fs.appendFile('1.txt', data + '\n', (err) => {
    if (err) {
      console.log('Error saving user information:', err);
      res.sendStatus(500);
    } else {
      console.log('User information saved successfully.');
      res.sendStatus(200);
    }
  });
});

// Handle CORS preflight requests
app.options('/save', (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
