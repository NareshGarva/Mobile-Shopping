const express = require('express');
const router = express.Router();
const { addUserAddress, getUserAddress, updateUserAddress,setDefaultAddress, deleteUserAddress } = require('../controllers/userAddressControllers');

router.post('/add-address', addUserAddress);
router.delete('/:id', deleteUserAddress);
router.get('/get-address', getUserAddress); // Protected route
router.patch('/:id', setDefaultAddress);
router.put('/:id', updateUserAddress);

module.exports = router;
