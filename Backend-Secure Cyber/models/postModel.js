const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type :String,
        required:true
    },
    companyEmail:{
        type: String,
        required:true
        
    },
    description :{
        type: String,
        required:true
    },
    company :{
        type :String,
        required:true,
        enum : ["BOC",
                "People's Bank",
                "NSB",
                "HNB",
                "Other"
        ]
    },
    category :{
        type :String,
        required :true,
        enum : ["IT",
                "Finance",
                "Marketing",
                "Other"
        ]
    },
    visualContent :{
        type :String,
        required:false,

    },
    visualContentType :{
        type :String,
        enum : ['image' , 'video'],
        required:false,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Post' ,postSchema );