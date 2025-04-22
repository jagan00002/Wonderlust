const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// correct one
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"67c7348632f599bc22181844"}))
  await Listing.insertMany(initData.data);
  // console.log(initData.data[0])
  console.log("data was initialized");
};



// same as in lecture

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({ ...obj, owner: "67c7348632f599bc22181844" }));
//   await Listing.insertMany(initData.data); // ✅ Use the modified array
//   console.log("Data was initialized");
// };

// copilot 
// const initDB = async () => {
//   try {
//     await Listing.deleteMany({});
//     console.log("Existing listings deleted");

//     initData.data = initData.data.map((obj) => ({ ...obj, owner: "67c7348632f599bc22181844" }));
//     await Listing.insertMany(initData.data); // ✅ Use the modified array

//     console.log("Data was initialized");
//   } catch (error) {
//     console.error("Error initializing data:", error);
//   }
// };


initDB();
