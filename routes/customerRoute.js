const express = require('express');
const router = express.Router();
const {
    getCustomers,
    getCustomerById,
    createCustomers,
    updateCustomers,
    deleteCustomers
} = require('../controllers/customerController');

router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.post('/', createCustomers);
router.put('/:id', updateCustomers);
router.delete('/:id', deleteCustomers);

module.exports = router;