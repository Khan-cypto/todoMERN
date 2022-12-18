// Routes are just HTTP Requests

const router = require('express').Router();
//import todo model
const todoItemsModel = require('../models/todoItems');

// creating first route -- We will add Todo Item to our database
router.post('/api/item', (req, res)=>{
	try{
		const newItem = new todoItemsModel({
		 item: req.body.item
		})
		// save items in database
		const saveItem = newItem.save()
		res.status(200).json(saveItem) //"Item Added Successfully"
	}
	catch(err){
		res.json(err);
	}
})


//creating second route
router.get('/api/items', async(req, res)=>{
	try{
		const allTodoItems = await todoItemsModel.find({});
		res.status(200).json(allTodoItems)
	}
	catch(err){
		res.json(err);
	}
})

// creating update item
router.put('/api/item/:id', async (req, res)=>{
	try{
	// find items by its id and update it
		const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
		res.status(200).json('Item Updated!')
	}
	catch(err){
		res.json(err);
	}
})


// //update item
// router.put('/api/item/:id', async (req, res)=>{
//   try{
//     //find the item by its id and update it
//     const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
//     res.status(200).json(updateItem);
//   }catch(err){
//     res.json(err);
//   }
// })


// deleting item from database
router.delete('/api/item/:id', async(req, res)=>{
	try{
		// find the item by id and delete it
		const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
		res.status(200).json("Item Deleted");
	}
	catch(err){
		res.json(err);
	}
})


// export router
module.exports = router;



// same BODY is used for POST(/item), GET(/items)
// {
//     "item": "This is the third todo item"
// }
