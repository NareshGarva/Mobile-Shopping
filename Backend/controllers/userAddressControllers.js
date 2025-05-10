const { where } = require("sequelize");
const {
  User,
  userAddress
} = require("../models/initAssociations");



exports.addUserAddress = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({message:"Please provide address data"});
    }
    const {userId,addressType,defaultAddress,fullName,addressLine1,localityArea,cityTown,state,pinCode,country,mobileNumber} = req.body;

    try{
        //check if the user exists
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            console.log("User not found : ", userId);
            return res.status(400).json({message: "User not found"});
        }

        //make the first address as default 
        if(userAddress.length == 0){
            defaultAddress = true;
        }
        //create a new address
        const newAddress = await userAddress.create({userId,addressType,defaultAddress,fullName,addressLine1,localityArea,cityTown,state,pinCode,country,mobileNumber});

        if(!newAddress){
            console.log("Address not created");
            return res.status(400).json({message: "Address not created"
            });
        }
    }catch(error){
        console.log("Error in creating address: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

exports.getUserAddress = async (req, res) =>{
    const {userId} =  req.params;
    try{
        //check if user exists
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            console.log("User not found : ", userId);
            return res.status(400).json({message: "User not found"});
        }

        // get all the addresses of the user
        const addresses = await userAddress.findAll({where: {userId: userId}})

        if(!addresses){
            console.log("Addresses not found");
            return res.status(400).json({message: "Addresses not found"});
        }

        console.log("Addresses are fonud");
        return res.status(200).json({message: "Addresses found", addresses});
    }catch(error){
        console.log("error in getting addresses : ", error);
        return res.status(500).json({message: "Intrenal server error"});
    }
}


exports.updateUserAddress = async (res, req) =>{
    const {addressId} = req.params;
    const {userId,addressType,defaultAddress,fullName,addressLine1,localityArea,cityTown,state,pinCode,country,mobileNumber} = req.body;

    try{
        //check if the address exists
        const address = await userAddress.findOne({where: {addressId: addressId}});
        if(!address){
            console.log("Address not found : ", addressId);
            return res.status(400).json({message: "Address not found"});
        }

        //Update the address
        const updatedAddress = await userAddress.update({userId,addressType,defaultAddress,fullName,addressLine1,localityArea,cityTown,state,pinCode,country,mobileNumber}, {where: {addressId: addressId}});
        // check if the address is updated
        if(!updatedAddress){
            console.log("Address not updated");
            return res.status(400).json({message: "Address not updated"});
        }

        console.log("Address updated");

        return res.status(200).json({message: "Address updated"})
    }catch(error){
        console.log("error in updating address : ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


exports.setDefaultAddress = async (req, res) =>{
    const {addressId, userId} = req.params;

    try{
        //check if the address exixts
        const address = await userAddress.findOne({where: {addressId:addressId} && {userId:userId}});

        if(!address){
            console.log("address not found : ", addressId);
            return res.status(400).json({message: "Address not found"});
        }

        //set the default address
        const allAddresses = await userAddress.findAll({where:{userId:userId}});
        allAddresses.forEach(async (address) =>{
            await userAddress.update({defaultAddress:false}, {where: {addressId: address.addressId}});
        })
        await userAddress.update({defaultAddress:true}, {where:{addressId: addressId}});
        console.log("Default address set : ", addressId);
        return res.status(200).json({message: "Default address set"});
    }catch(error){
        console.log("Error in setting default address :", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


exports.deleteUserAddress = async (req, res) =>{
    const {addressId}= req.params;
    try{
        //check if the address exists
        const address = await userAddress.findOne({where: {addressId: addressId}});
        if(!address){
            console.log("Address not found : ", addressId);
            return res.status(400).json({message: "Address not found"});
        }

        //delete the address
        const deletedAddress = await userAddress.destroy({where:{addressId: addressId}});
        if(!deletedAddress){
            console.log("Address not deleted");
            return res.status(400).json({message: "Address not deleted"});
        }

        console.log("Adddress deleted :", addressId);
        return res.status(200).josn({message: "Address deleted"});
    }catch(error){
        console.log("error in deleting address : ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}