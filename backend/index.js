import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import CategoryRoute from "./routes/CategoryRoute.js"
import CustomerRoute from "./routes/CustomerRoute.js"
import ProductrRoute from "./routes/ProductRoute.js"
import OrderrRoute from "./routes/OrderRoute.js"
import db from "./config.js"
const app = express();
// databse connection



// MiddleWares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/categories" , CategoryRoute);
app.use("/customers" , CustomerRoute);
app.use("/products" , ProductrRoute);
app.use("/orders" , OrderrRoute);


app.get("/", (req, res)=>{
    res.send("Welcome to MERAN")
})


app.listen(5555,()=>{
    console.log("Server listen on server 5555");
}
)

