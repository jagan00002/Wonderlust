const Listing=require("../models/listing.js")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async (req,res)=>{
    const allListings= await Listing.find({});
    // //console.log('1')
// getting all listing detailsin //console/terminal

    // //console.log(allListings);
    res.render("listings/index.ejs",{allListings})
}

module.exports.newRoute=(req,res)=>{
  // //console.log('1j')
    res.render("listings/new.ejs")
}

module.exports.showRoute=async (req,res)=>{
  // //console.log('2')
  // //console.log("id route")
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews",populate:{path:"author"}})
    .populate("owner");
    if(!listing){
      req.flash("error","listing does not exists")
      re.redirect("/listings")
    }
  //   //console.log(listing)
    res.render("listings/show.ejs",{listing})
}

// backend code where data storing in database cloudinary

// og

module.exports.createRoute=async(req,res,next)=>{

  let response=await geocodingClient
  .forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send()


    let url=req.file.path;
    let filename=req.file.filename;
    // //console.log(url,"..",filename)
    const newListing=new Listing(req.body.listing)
    newListing.owner=req.user._id;
    newListing.image={url,filename}

    newListing.geometry=response.body.features[0].geometry;

    let saveListing=await newListing.save();
    console.log(saveListing)

    req.flash("sucess","New listing created sucessfully")
    res.redirect("/listings");  
}

// module.exports.createRoute = async (req, res, next) => {
//   try {
//     const response = await geocodingClient
//       .forwardGeocode({
//         query: req.body.listing.location,
//         limit: 1
//       })
//       .send();

//     const geometry = response.body.features[0]?.geometry;

//     if (!geometry) {
//       req.flash("error", "Invalid location");
//       return res.redirect("/listings/new");
//     }

//     console.log("Location geometry:", geometry);

//     let url = req.file.path;
//     let filename = req.file.filename;

//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = { url, filename };
//     newListing.geometry = geometry; // assuming you want to store it
//     await newListing.save();

//     req.flash("success", "New listing created successfully");
//     res.redirect("/listings");
//   } catch (err) {
//     console.error("Error creating listing:", err);
//     req.flash("error", "Something went wrong while creating the listing.");
//     res.redirect("/listings/new");
//   }
// };


module.exports.editRoute=async(req,res)=>{
  //console.log('4')
    let {id}=req.params;
    const listing=await Listing.findById(id);
  //   //console.log(listing)
    if(!listing){
      req.flash("error","listing does not exists")
      return res.redirect("/listings")
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload/", "/upload/e_blur:500,w_100,h_100");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
    
 }

 module.exports.updateRoute=async (req,res)=>{
  //console.log('5')
       let {id}=req.params;

      //  suraj code
      //  req.body.listing={...req.body.listing, image: {url: req.body.listing.image, filename: req.body.listing.title + "_image"}}
      //  console.log(req.body.listing)


    // new image file updating
       let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})
       
       if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename}
        await listing.save();
       }

       req.flash("sucess","listing updated sucessfully")
       res.redirect(`/listings/${id}`)
       // res.redirect("/listings");
   }

   module.exports.deleteRoute=async(req,res)=>{
         let {id}=req.params;
         let deletedListing= await Listing.findByIdAndDelete(id)
         //console.log(deletedListing)
         req.flash("sucess"," listing deleted sucessfully")
         res.redirect("/listings")
     }