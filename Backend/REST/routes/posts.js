const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//GET ALL CUSTOMERS
//This function is used to get all the customers from the database
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.type("json").send(JSON.stringify(posts, null, 4) + "\n");
  } catch (error) {
    res.json({ message: error });
  }
});

//SUBMITS A CUSTOMER
//This function is used to post/send/save the data of the new customer to the database
router.post("/", async (req, res) => {
  const post = new Post({
    customerName: req.body.customerName,
    customerAddress: req.body.customerAddress,
    customerMobile: req.body.customerMobile,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE CUSTOMER BY ID
//This function is used to delete a customer from the databse using a specific id passed after the .../posts/ directory
//'Post.remove' function is used to remove the data from DB, and the passed id in the url is passed into this fucntion
router.delete("/:id", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.id });
    res.json({ message: "1" });
  } catch (error) {
    res.json({ message: "0" });
  }
});

//UPDATE CUSTOMER BY ID
//This function is used to update a customer using two object parameters passed in the 'Post.updateOne' function
//The first object parameter is the id of the target customer, and the second object is the new data(name-address-mobile) that will be updated
router.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          customerName: req.body.customerName,
          customerAddress: req.body.customerAddress,
          customerMobile: req.body.customerMobile,
        },
      }
    );
    res.json({ message: "1" });
  } catch (error) {
    res.json({ message: "0" });
  }
});

module.exports = router;
