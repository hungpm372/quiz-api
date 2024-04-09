module.exports = (req, res, next) => {
    setTimeout(next, Math.floor(Math.random() * 0 + 100))
}
