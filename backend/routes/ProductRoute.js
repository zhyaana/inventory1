import express from "express"
import db from "../config.js"
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM Products ORDER BY productID");
        const products = result.rows;
        res.status(201).json({ data: products, count: products.length });
        console.log("seccussfully retrived all products")
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not fetch the data" + error)
    }
})

router.get("/product/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM Products WHERE productID = $1", [id]);
        const product = result.rows;
        res.status(201).json(product);
        console.log("seccussfully retrived the product")
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not fetch the data" + error)
    }
})
router.patch("/product/updatequantity/:id", async (req, res) => {
    const { id } = req.params;
    const {quantity} = req.body;
    try {
         await db.query("UPDATE Products SET stockQuantity=$1, WHERE productID = $2", [quantity,id]);
        res.status(201).send("pudated quantity");
        console.log("seccussfully updated the product's quantity")
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not update the quantity" + error)
    }
})
router.post("/product", async (req, res) => {
    const { productname, categoryid, price, stockquantity, image , description } = req.body;
    try {
         await db.query("INSERT INTO Products (productName, categoryID, price, stockQuantity, image, description) VALUES ($1, $2, $3, $4, $5, $6)", [productname, categoryid,price, stockquantity, image, description]);
        console.log("seccussfully added the product")
        res.status(204).json({
            message: 'Product added successfully',
          });
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not add the product" + error)
    }
})
router.delete("/product/:id" , async (req,res)=>{
    const {id} = req.params;
    try {
        await db.query("DELETE FROM Products WHERE productID=$1" , [id]);
        res.status(201).json("product deleted");
        console.log("seccussfully deleted the product")
    } catch (error) {
        res.status(404).send(error)
        console.log("product could not delete" + error)
    }
})

router.put("/product/:id" , async (req,res)=>{
    const {id} = req.params;
    const { productname, categoryid, price, stockquantity, image , description } = req.body;
    try {
        const result =await db.query("UPDATE Products SET productName=$1, categoryID=$2, price=$3, stockQuantity=$4, image=$5, description=$6  WHERE productID=$7" , [productname,categoryid,price,stockquantity,image,description, id]);
        res.status(201).json("product updated");
        console.log("seccussfully updated the product")
    } catch (error) {
        res.status(404).send(error)
        console.log("product could not update" + error)
    }
})


export default router;