const expect = require ( "chai" ).expect
const request = require ( "supertest" )

const app = require ( "../../../app" )
const customerController = require ( "../../../controllers/customer-controller" )
const { CustomerEntity } = require ( "../../../orm/sequelize/model/sequelize-orm-model" )
const { ErrorType } = require ( "../../../model/error-model" )
const { getResponseMock } = require ( "../../test-utils" )

const agent = request.agent ( app )

// TODO CONFIGURARE DB DI TEST PER GLI E2E TESTS

before ( ( done ) => {

    app.on ("appStarted", function(){

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