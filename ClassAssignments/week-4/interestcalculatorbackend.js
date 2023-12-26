const express = require('express');

const app = express();

app.get('/interest', function(req, res) {
    let principal=req.params["principal"];
    let rate=req.params["rate"];
    let time=req.params["time"];
  });

app.listen(3000);