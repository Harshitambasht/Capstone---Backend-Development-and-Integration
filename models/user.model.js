
module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema({
            firstName: { 
                type: String, 
                required: true,
             },
            lastName: String,
            email: { 
                type: String, 
                unique: true,
                 required: true,
                  dropDups: true
                 },
            password: {
                 type: String, 
                 required: true,
                 min: 8,
                 max:50, 
                },
            contactno: {
                type: Number,
                required: true,
                max: 10,
            },
            role: {
                type: String,
                enum: ["user", "admin"],
                default: "user",
            },
            isAdmin: Boolean,
            token: String,
        },
            { timestamps: true }
        )
    );
    return User;
};