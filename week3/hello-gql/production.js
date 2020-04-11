'use strict';

module.exports = (app, httpPort) => {
  app.enable('trust proxy');

  app.use ((req, res, next) => {
    if (req.secure) {
      // request was via https, so do no special handling
      next();
    } else {
      console.log('http?, redirect to https...');
      // request was via http, so redirect to https
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  });

  app.listen(httpPort, () => console.log(`app listening on port ${httpPort}`));
};

