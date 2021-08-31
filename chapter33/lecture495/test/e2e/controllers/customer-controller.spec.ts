//import { expect } from "chai"
import * as request from "supertest"

import { app } from "../../../src/ts/app"


const agent = request.agent ( app )

// TODO CONFIGURARE DB DI TEST PER GLI E2E TESTS

before ( ( done ) => {

    app.on ("appStarted", () => {

        done ()
    } )
} )

// TODO Il test non termina, rimane appeso
describe ( "customer-controller", () => {

    describe ( "GET http://localhost:3000/api/v1/customers", () => {

        it ( "should return status code 200 and all the customers", ( done ) => {

            agent.get ( "/api/v1/customers" )
                .expect ( 200 )
                .expect ( "Content-Type", "application/json; charset=utf-8" )
                .then ( response => {
                    //assert ( response.body.email, 'foo@bar.com' )

                    // TODO assertions
                    done ()
                })
                .catch ( err => done ( err ) )
        } )
    } )
} )