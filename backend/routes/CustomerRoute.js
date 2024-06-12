import express from "express"
import db from "../config.js"
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM Customers ORDER BY customerID");
        const customers = result.rows;
        res.status(201).json({ data: customers, count: customers.length });
        console.log("seccussfully retrived all customers")
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not fetch the data" + error)
    }
})

router.get("/customer/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM Customers WHERE customerID = $1", [id]);
        const customer = result.rows;
        res.status(201).json(customer);
        console.log("seccussfully retrived the customers")
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not fetch the data" + error)
    }
})
router.post("/customer", async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, phone, address, city, state, zipcode } = req.body;

    try {
         await db.query("INSERT INTO Customers (firstName, lastName, email, phone, address, city, state, zipCode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);", [firstname, lastname, email, phone, address, city, state, zipcode]);
        console.log("seccussfully added the customers")
        res.status(201).send();
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not add the customer" + error)
    }
})
router.delete("/customer/:id" , async (req,res)=>{
    const {id} = req.params;
    try {
        await db.query("DELETE FROM Customers WHERE customerID=$1" , [id]);
        res.status(201).json("customer deleted");
        console.log("seccussfully deleted the Customer")
    } catch (error) {
        res.status(404).send(error)
        console.log("Customer could not delete" + error)
    }
})

router.put("/customer/:id" , async (req,res)=>{
    const {id} = req.params;
    const { firstname, lastname, email, phone, address, city, state, zipcode } = req.body;
    try {
        const result =await db.query("UPDATE Customers SET firstName =$1 , lastName=$2, email=$3, phone=$4, address=$5, city=$6, state=$7, zipCode=$8  WHERE customerID=$9" , [firstname,lastname,email,phone,address,city,state,zipcode , id]);
        res.status(201).json("Customer updated");
        console.log("seccussfully updated the Customer")
    } catch (error) {
        res.status(404).send(error)
        console.log("Customer could not update" + error)
    }
})

// Customer details with Order
router.get("/customer/details/:customerid", async (req, res) => {
    const { customerid } = req.params;
    try {
        const result = await db.query("SELECT c.customerID, c.firstName ,c.lastName ,c.phone,c.email ,o.orderID ,o.totalAmount ,o.orderDate FROM Customers c JOIN Orders o ON c.customerID = o.customerID WHERE c.customerID = $1", [customerid]);
        const detail = result.rows;
        res.status(201).json({data:detail , count:detail.length});
        console.log("seccussfully retrived the detail of the customer ")
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not fetch the data" + error)
    }
})

export default router;
