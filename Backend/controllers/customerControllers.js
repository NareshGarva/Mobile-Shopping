const User = require('../models/user');

// Get All Customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.findAll({});
    if (customers.length === 0) {
      return res.status(404).json({ message: 'No customers found' });
    }
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error.message);
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};

// Delete Customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting customer with ID:', id);

    const customer = await User.findOne({ where: { id } });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await User.destroy({ where: { id } });
    console.log('Customer deleted successfully');
    res.status(200).json({ message: 'Customer deleted successfully' });

  } catch (error) {
    console.error('Error deleting customer:', error.message);
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
};
