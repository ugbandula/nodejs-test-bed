///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
let objectTester = require('../controllers/objects/objects-tester');

///////////////////////////////////////////////////////////////
// Module Level Private Functions
///////////////////////////////////////////////////////////////
let showRootAPIWelcomeMessage = function(req, res) {
    res.json({ message: 'Welcome to Test Bed Services API base. Malformed request observed!' });
};

let showOutageServicesWelcomeMessage = function(req, res) {
    res.json({ message: 'Welcome to Test Bed Services API base. Malformed request observed!' });
};

///////////////////////////////////////////////////////////////
// 	Exposed Methods
///////////////////////////////////////////////////////////////
module.exports = function (app) {

    app.get('/', showRootAPIWelcomeMessage);
    app.get('/api/', showOutageServicesWelcomeMessage);

    app.get('/api/objects/merger/assign/', objectTester.objectMergerTestUsingAssign);
    app.get('/api/objects/merger/hasProperty/', objectTester.objectMergerTestUsingHasOwnProperty);
    app.get('/api/objects/merger/underscoreMerge/', objectTester.objectMergerTestUsingUnderscoreMerge);
    app.get('/api/objects/merger/custom/', objectTester.objectMergerTestUsingCustomMerge);

    /**
     * Error handling
     */
    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {

            return next();
        }
        console.error('Object not found ' + err.stack);

        // error page
        res.status(500).render('500', { error: err.stack });
    });

    // assume 404 since no middleware responded
    app.use(function (req, res, next) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });

};
