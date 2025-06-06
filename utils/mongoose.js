import mongoose from "mongoose";


let initialized = false;

export const connect = async() =>{
    mongoose.set('strictQuery', true)
    if(initialized){
        console.log('Mongodb connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "clerk-mongo",
            usenewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Mongodb connected')
        initialized = true;
    } catch (error) {
        console.log('Mongodb connection error' , error);
        
    }


}