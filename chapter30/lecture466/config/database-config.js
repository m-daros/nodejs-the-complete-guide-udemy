module.exports = {

    HOST: "localhost",
    PORT: 3306,
    USER: "nodejs_course_user",
    PASSWORD: "nodejs_course_pwd",
    DB: "nodejs_complete_guide",
    DIALECT: "mysql",

    pool: {

        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}