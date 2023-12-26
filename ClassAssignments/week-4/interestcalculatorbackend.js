const express = require('express');

const app = express();

app.get('/interest', function(req, res) {
    let principal=parseInt(req.params["principal"]);
    let rate=parseInt(req.params["rate"]);
    let time=parseInt(req.params["time"]);

    let intrst=(principal*rate*time)/100

    res.status(200).json({interest:intrst});
  });

app.listen(3001);