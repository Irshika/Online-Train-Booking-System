const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Train = require('../models/train');

/*This is where backend get train list from the DB */
router.get('/', (req, res, next) =>{
   train.find()
   .exec()
   .then(docs => {
       console.log(docs);
       res.status(200).json(docs);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       });
   });
});


/*This is where backend create a new train item and add it to the DB */
router.post('/', (req, res, next) =>{
    
    const train = new Train({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    train.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Handling POST requests to /trains',
            createdTrain: result    
        });
    })
    .catch(err => 
        {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    
});

//take the specified train info from the DB when user gives relevant information
router.get('/:trainId', (req, res, next) => {
    const id = req.params.trainId;
  Train.findById(id)
  .exec()
  .then(doc => {
      console.log("From database", doc);
      if(doc){
        res.status(200).json(doc);
      }else{
          res.status(404).json({
              message: 'No valid entry found for provided train'
          })
      }
     
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
  });
});

//update train details in the added train list
router.patch('/:trainId', (req, res, next) => {
   res.status(200).json({
       message: 'Updated train!'
   });
});

//delete specified trains from the train list
router.delete('/:trainId', (req, res, next) => {
   const id = req.params.trainId;
   Train.remove({_id: id})
   .exec()
   .then(result => {
       res.status(200).json(result);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       });
   });
 });

module.exports = router;