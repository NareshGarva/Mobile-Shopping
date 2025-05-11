const express = require('express');
const router = express.Router();
const { addUserAddress, getUserAddress, updateUserAddress,setDefaultAddress, deleteUserAddress, getDefaultAddress } = require('../controllers/userAddressControllers');

router.post('/add-address', addUserAddress);
router.delete('/:addressId', deleteUserAddress);
router.get('/get-address/:userId', getUserAddress);
router.get('/get-default-address/:userId', getDefaultAddress); 
router.put('/set-default/:addressId/:userId', setDefaultAddress);
router.put('/update-address/:addressId', updateUserAddress);

module.exports = router;
