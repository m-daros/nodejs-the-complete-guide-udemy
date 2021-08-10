const mysql = require ( "mysql2" );

const pool = mysql.createPool ( {

    host: "localhost",
    port: 3306,
    database: "nodejs_complete_guide",
    user: "nodejs_course_user",
    password: "nodejs_course_pwd"
} );

module.exports = pool.promise ();