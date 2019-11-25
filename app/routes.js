module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      let userID = req.user._id
        db.collection('final').find({personPost: userID}).toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

  // all users routes ===============================================================

  app.get('/allUsers' , function(req, res) {
    db.collection('users').find().toArray((err, users) => {
      if (err) return console.log(err)
      console.log(users)
      res.render('allUsers.ejs', {
        allUsers: users
      });
    })
  })

  app.delete('/cancel', function (req, res) {
    db.collection('users').findOneAndDelete({user: req.user._id}, (err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs' {message: "account has been deleted"});
    })
  })


// z ===============================================================
    //
    // app.post('/list', (req, res) => {
    //   console.log("user id", req.user._id)
    //   db.collection('list').save({item: req.body.item, note: req.body.note, pic: req.body.pic, personPost: req.user._id}, (err, result) => {
    //     if (err) return console.log(err)
    //     console.log('saved to list database')
    //     res.redirect('/profile')
    //        })
    // })
    //
    // app.delete('/list', (req, res) => {
    //   db.collection('list').findOneAndDelete({item: req.body.item, note: req.body.note, personPost: req.user._id}, (err, result) => {
    //     if (err) return res.send(500, err)
    //     res.send('Message deleted!')
    //   })
    // })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form

  app.get('/login', function(req, res) {
      res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
