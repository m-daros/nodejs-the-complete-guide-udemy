
// Catch unhandled exceptions for async functions using async / catch sysntax
// The catched exception can be intercepted by an express.js  global error andler ( error, request, response, next ) = fn
exports.catchErrors = fn => ( ...args ) => fn ( ...args ).catch ( args [2] )