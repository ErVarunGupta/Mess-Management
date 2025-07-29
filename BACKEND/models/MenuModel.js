import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    Monday: {
        breakfast:{
            type: String,
            required: true
        },
        lunch: {
            type: String,
            required: true
        },
        dinner: {
            type: String,
            required: true
        }
    },
    Tuesday: {
        breakfast:{
            type: String,
            required: true
        },
        lunch: {
            type: String,
            required: true
        },
        dinner: {
            type: String,
            required: true
        }
    },
    Wednesday: {
        breakfast:{
            type: String,
            required: true
        },
        lunch: {
            type: String,
            required: true
        },
        dinner: {
            type: String,
            required: true
        }
    },
    Thursday: {
        breakfast:{
            type: String,
            required: true
        },
        lunch: {
            type: String,
            required: true
        },
        dinner: {
            type: String,
            required: true
        }
    },
    Friday: {
        breakfast:{
            type: String,
            required: true
        },
        lunch: {
            type: String,
            required: true
        },
        dinner: {
            type: String,
            required: true
        }
    },
    Saturday: {
        breakfast:{
            type: String,
            required: true
        },
        lunch: {
            type: String,
            required: true
        },
        dinner: {
            type: String,
            required: true
        }
    },
    Sunday: {
        breakfast:{
            type: String,
            required: true
        },
        lunch: {
            type: String,
            required: true
        },
        dinner: {
            type: String,
            required: true
        }
    },
})


const MenuModel = mongoose.model('MenuModel', MenuSchema);
export default MenuModel;