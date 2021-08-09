const customers = [];

exports.addCustomer = ( customer ) => {

    customers.push ( customer );
};

exports.getCustomers = () => {

    return customers;
};