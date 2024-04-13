module.exports = () => {
    return (req, res, next) => {
        setTimeout(next, Math.floor(Math.random() * 700) + 300)
    }
}
