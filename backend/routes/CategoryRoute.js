import express  from "express"
import db from "../config.js"
const router = express.Router();

// Get all the categories
router.get("/" ,async (req,res)=>{
    try {
        const result =await db.query("SELECT * FROM Categories ORDER BY categoryID");
        const Categories = result.rows;
        res.status(201).json({data: Categories , count:Categories.length});
        console.log("seccussfully retrived all Categories")
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not fetch the data" + error)
    }
})
router.get("/category/:id" , async (req,res)=>{
    const {id} = req.params;
    try {
        const result =await db.query("SELECT * FROM Categories  WHERE categoryID=$1" , [id]);
        const category = result.rows;
        res.status(201).json(category);
        console.log("seccussfully retrived the Categories")
    } catch (error) {
        res.status(404).send(error)
        console.log("Category not found" + error)
    }
})
router.post("/category" , async (req,res)=>{
    const {categoryname ,description } = req.body;
    try {
        const result =await db.query("INSERT INTO Categories (CategoryName, Description) VALUES ($1 , $2);" , [categoryname , description]);
        res.status(201).json("seccussfully added a category");
        console.log("seccussfully added the Categories")
    } catch (error) {
        res.status(404).send(error)
        console.log("Category couldnot add" + error)
    }
})
router.delete("/category/:id" , async (req,res)=>{
    const {id} = req.params;
    try {
        const result =await db.query("DELETE FROM Categories WHERE categoryID=$1" , [id]);
        res.status(201).json("Category deleted");
        console.log("seccussfully deleted the Categories")
    } catch (error) {
        res.status(404).send(error)
        console.log("Category could not delete" + error)
    }
})

router.put("/category/:id" , async (req,res)=>{
    const {id} = req.params;
    const {categoryname,description} = req.body;
    try {
        const result =await db.query("UPDATE Categories SET categoryName = $1 , description=$2  WHERE categoryID=$3" , [categoryname , description , id]);
        res.status(201).json("Category updated");
        console.log("seccussfully updated the Categories")
    } catch (error) {
        res.status(404).send(error)
        console.log("Category could not update" + error)
    }
})





export default router;