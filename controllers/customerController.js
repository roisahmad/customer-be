const Customer = require('../models/customer');
const { successResponse, errorResponse } = require('../utils/response');

exports.getCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;   
  const limit = parseInt(req.query.limit) || 100;

  try {
    const customers = await Customer.find()
      .skip((page - 1) * limit)
      .limit(limit)
      

    const total = await Customer.countDocuments();
    
    const response = customers.map((el) => ({
                    _id: el?._id,
                    number: el?.number,
                    nameOfLocation: el?.nameOfLocation,
                    date: el?.date,
                    loginHour: el?.loginHour,
                    name: el?.name,
                    age: new Date().getFullYear() - el?.age,
                    gender: el?.gender,
                    email: el?.email,
                    noTelp: el?.noTelp,
                    brandDevice: el?.brandDevice,
                    digitalInterest: el?.digitalInterest,
                    locationType: el?.locationType,
                    __v: el?.__v
                }))

    successResponse(res, 200, 'Customers retrieved successfully', {
      total,
      page,
      limit,
      data: response,
    });
  } catch (err) {
    errorResponse(res, 500, 'Error retrieving customers', err.message);
  }
};

exports.getCustomerById = async (req, res) => {
    const { id } = req.params;
    const customers = await Customer.findById(id);
    if (!customers) {
        return errorResponse(res, 404, 'Customer not found');
    }
    successResponse(res, 200, 'Customer retrieved successfully', customers);
};

exports.createCustomers = async (req, res) => {
    const customers = new Customer(req.body);
    await customers.save();
    successResponse(res, 201, 'Customer created successfully', customers);
};

exports.updateCustomers = async (req, res) => {
    const { id } = req.params;
    const customers = await Customer.findByIdAndUpdate(id, req.body, { new: true });
    if (!customers) {
        return errorResponse(res, 404, 'Customer not found');
    }
    successResponse(res, 200, 'Customer updated successfully', customers);
}

exports.deleteCustomers = async (req, res) => {
    const { id } = req.params;
    const customers = await Customer.findByIdAndDelete(id);
    if (!customers) {
        return errorResponse(res, 404, 'Customer not found');
    }
    successResponse(res, 200, 'Customer deleted successfully', customers);
}
