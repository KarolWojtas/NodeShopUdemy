exports.getNotFound = (req, res, next) => {
    res.status(404)
        .render('404', {
        docTitle: 'Not found',
        path: req.path
    });
};
//# sourceMappingURL=error.js.map