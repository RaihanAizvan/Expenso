exports.isAdmin = (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL
  console.log(req.session);
  if (req.session.adminEmail&&req.session.adminEmail === adminEmail) {
    //user is an admin
    next()
    console.log('middleware passed')
} else {
    res.redirect("/admin/login")
    console.log('middleware rejected')
  }
}
