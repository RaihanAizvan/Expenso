exports.isLogged = function (req, res, next) {
  if (req.session && req.session.user) {
    next()
  } else {
    res.redirect("/login")
  }
}

// Middleware to set headers to avoid caching
exports.noCache = function (req, res, next) {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private")
  res.set("Pragma", "no-cache")
  res.set("Expires", "0")
  next()
}

