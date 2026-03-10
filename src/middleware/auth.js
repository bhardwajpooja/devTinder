const userAuth = (req, res, next) => {
    next();
}

const adminAuth = (req, res, next) => {
    next();
}

module.exports = {
    userAuth,
    adminAuth
}