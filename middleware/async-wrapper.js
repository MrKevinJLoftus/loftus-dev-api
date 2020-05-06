const asyncMiddleware = (ftn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

module.exports = {
    asyncMiddleware
};