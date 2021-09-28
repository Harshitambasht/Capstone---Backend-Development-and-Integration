const Addresses = require("./../models/address.model");
const validator = require("validator");
const Users = require("./../models/user.model")

exports.address = (req, res) => {
    const {
        name,
        city,
        state,
        street,
        contactNumber,
        landmark,
        zipcode,

    } = req.body;

    var user = Users.findOne({ name: name })
        .then(data => {
            user.user = data;

        })

    const newAddress = new Addresses({
        name,
        city,
        state,
        street,
        contactNumber,
        landmark,
        zipcode,
        user: user,

    });

    // contact number validation
    if (!validator.isMobilePhone(req.body.contactNumber) || (req.body.contactNumber).length !== 10) {
        res.status(400).send("Invalid contact number!");
    }
    // // zipcode validation
    // if(validator.isPostalCode(req.body.zipcode) || (req.body.zipcode).length !== 6){
    //     res.status(400).send("Invalid zip code!");
    //     }

    const filter = { name: name }
    Addresses.findOneAndUpdate(filter, { useFindAndModify: false })
        .then(data => {
            {
                newAddress.save((err, user) => {
                    if (err)
                        return res.status("400").send(err.message || "some error occurred");
                    res.status(200).send(user);
                });
            }

        })
};
