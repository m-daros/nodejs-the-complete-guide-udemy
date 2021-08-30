import {Dialect} from "sequelize/types/lib/sequelize";

export interface DbConfigPool {

    MIN:     number
    MAX:     number
    ACQUIRE: number
    IDLE:    number
}

export interface DbConfig {

    HOST:     string
    PORT:     number
    USER:     string
    PASSWORD: string
    DB:       string
    DIALECT:  Dialect
    POOL:     DbConfigPool
}

const dbConfig: DbConfig = {

    HOST:     "localhost",
    PORT:     3306,
    USER:     "nodejs_course_user",
    PASSWORD: "nodejs_course_pwd",
    DB:       "nodejs_complete_guide",
    DIALECT:  "mysql",
    POOL: {

        MIN:     0,
        MAX:     5,
        ACQUIRE: 30000,
        IDLE:    10000
    }
}

export default dbConfig