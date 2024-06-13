import express from "express"
import db from "../config.js"
const router = express.Router();

// post Order
router.post("/order", async (req, res) => {
    const { customerID, totalAmount } = req.body;
    const orderdProducts = req.body.orderdProducts;
    try {
        const resOrder = await db.query("INSERT INTO Orders (customerID , totalAmount) VALUES ($1, $2) RETURNING orderID", [customerID, totalAmount]);
        console.log("seccussfully added the order")
        if (!resOrder || !resOrder.rows || resOrder.rows.length === 0) {
            throw new Error('Failed to retrieve orderid after inserting order');
        }
        const newOrderID = resOrder.rows[0].orderid;

        for (const details of orderdProducts) {
            await db.query("INSERT INTO OrderDetails (orderID, productID , quantity , unitPrice) VALUES ($1, $2, $3,$4)", [newOrderID, details.productid, details.quantity, details.price])
        }

        for (const item of orderdProducts) {
            const { productid, quantity  , stockquantity} = item;
            const qty = stockquantity - parseInt(quantity, 10);
            await db.query("UPDATE Products SET stockQuantity=$1  WHERE productID = $2", [qty, productid]);
        }
        const allProducts = await db.query("SELECT * FROM Products ORDER BY productID");

        res.status(201).json({ message: 'Order processed successfully!', data:allProducts.rows });
        // res.status(201).json({ message: 'Order processed successfully!', orderdProducts })
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not add the order" + error)
    }
})
// post Order Detail for OrderList
router.post("/orderdetail", async (req, res) => {
    const { orderID, productID, quantity, unitPrice } = req.body;
    try {
        await db.query("INSERT INTO OrderDetails (orderID,productID,quantity,unitPrice ) VALUES ($1, $2,$3,$4)", [orderID, productID, quantity, unitPrice]);
        console.log("seccussfully added the orderdetail")
    } catch (error) {
        res.status(404).send(error)
        console.log("Could not add the orderdetail" + error)
    }
})

// get Order Detail for OrderList
router.get("/orderlist", async (req, res) => {
    try {
        const result = await db.query("SELECT c.customerID , c.firstName , c.lastName ,o.orderID ,o.orderDate , o.totalAmount FROM Customers c JOIN Orders o ON c.customerID = o.customerID")
        const list = result.rows
        res.status(201).json({ data: list })
        console.log("seccussfully fetched order list")
    } catch (error) {
        console.log("Error fetching order details for orderlist" + error)
    }
})

router.get("/orderlist/orderdetail/:orderid", async (req, res) => {
    const { orderid } = req.params;
    try {
        const result = await db.query("SELECT o.orderID,o.orderDate , o.totalAmount, od.productID , od.quantity ,od.unitPrice , p.productName ,p.price FROM Orders o JOIN OrderDetails od ON o.orderID = od.orderID JOIN Products p ON od.productID = p.productID WHERE o.orderID = $1", [orderid])
        const orderdetail = result.rows
        res.status(201).json({ data: orderdetail   , total: orderdetail[0].totalamount })
        console.log("seccussfully fetched orderdetail for this order from order list")
    } catch (error) {
        console.log("Error fetching order details for this order in  orderlist" + error)
    }
})


// INVOICE
router.get("/orderlist/invoice/:orderid", async (req, res) => {
    const { orderid } = req.params;
    try {
        const result = await db.query("SELECT c.customerID , c.firstName ,c.lastName,o.orderID ,o.orderDate ,o.totalAmount ,od.orderID,od.productID, od.quantity , od.unitPrice,p.productID,p.productName FROM Customers c JOIN Orders o ON c.customerID = o.customerID JOIN OrderDetails od ON od.orderID = o.orderID JOIN Products p ON od.productID = p.productID WHERE o.orderID = $1", [orderid])
        const invoice = result.rows
        res.status(201).json({data: invoice })
        console.log("seccussfully fetched orderdetail for invoicing")
    } catch (error) {
        console.log("Error fetching order details for this order in  orderlist for invoicing" + error)
    }
})
export default router;