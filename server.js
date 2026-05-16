const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); 


const app = express();
const port = 3000;



app.use(cors()); 



app.use(bodyParser.json());



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'restaurant'
});


db.connect(err => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database");
});


// Route to fetch customers
app.get('/customers', (req, res) => {
    db.query('SELECT * FROM customer', (err, result) => {
        if (err) {
            console.error("Error fetching customers:", err);
            return res.status(500).json({ error: "Failed to fetch customers" });
        }
        res.json(result);
    });
});


// Route to add a new customer
app.post('/customers', (req, res) => {
    const { name, phone, email } = req.body;


    const query = 'INSERT INTO customer (Name, PhoneNumber, Email) VALUES (?, ?, ?)';
    db.query(query, [name, phone, email], (err, result) => {
        if (err) {
            console.error("Error inserting customer:", err);
            return res.status(500).json({ error: 'Failed to add customer' });
        }
        res.status(201).json({
            message: 'Customer added successfully',
            customerID: result.insertId 
        });
    });
});


// Route to add a new employee
app.post('/employees', (req, res) => {
    const { name, role, phone, email, salary, username, password, averageRating } = req.body;


    const query = `
        INSERT INTO employee (Name, Role, PhoneNumber, Email, Salary, Username, password, Averagerating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        name,
        role,
        phone,
        email,
        parseInt(salary), 
        username,
        password,
        averageRating ? parseFloat(averageRating) : null 
    ];


    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting employee:", err);
            return res.status(500).json({ error: 'Failed to add employee' });
        }


        console.log("Employee added with ID:", result.insertId);
        res.status(201).json({
            message: 'Employee added successfully',
            employeeID: result.insertId
        });
    });
});


// Route to get all employees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) {
            console.error("Error fetching employees:", err);
            return res.status(500).json({ error: "Failed to fetch employees" });
        }
        res.json(result);
    });
});




// Route to get all food items
app.get('/fooditems', (req, res) => {
    db.query('SELECT * FROM fooditem', (err, result) => {
        if (err) {
            console.error("Error fetching food items:", err);
            return res.status(500).json({ error: "Failed to fetch food items" });
        }
        console.log("Food items fetched:", result);
        res.json(result);
    });
});


// Route to add a new food item
app.post('/fooditems', (req, res) => {
    const { name, category, price, description } = req.body;


    if (!name || !category || !price || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }


    const query = `
        INSERT INTO fooditem (Name, Category, Price, description)
        VALUES (?, ?, ?, ?)
    `;


    db.query(query, [name, category, price, description], (err, result) => {
        if (err) {
            console.error("Error adding food item:", err);
            return res.status(500).json({ error: "Failed to add food item" });
        }


        console.log("Food item added:", result.insertId);
        res.json({ message: "Food item added successfully", id: result.insertId });
    });
});


app.get('/inventory', (req, res) => {
  db.query('SELECT * FROM inventory', (err, result) => {
    if (err) {
      console.error("Error fetching inventory items:", err);
      return res.status(500).json({ error: "Failed to fetch inventory items" });
    }
    res.json(result);
  });
});


app.post('/inventory', (req, res) => {
  const { name, quantityInStock, unit } = req.body;

  if (!name || !quantityInStock || !unit) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const qty = parseFloat(quantityInStock);
  if (isNaN(qty)) {
    return res.status(400).json({ error: 'QuantityInStock must be a number' });
  }

  const query = 'INSERT INTO inventory (Name, QuantityInStock, Unit) VALUES (?, ?, ?)';
  db.query(query, [name, qty, unit], (err, result) => {
    if (err) {
      console.error("Error inserting inventory item:", err);
      return res.status(500).json({ error: 'Failed to add inventory item', details: err.sqlMessage || err.message });
    }
    res.status(201).json({
      message: 'Inventory item added successfully',
      itemID: result.insertId
    });
  });
});





app.post('/orders', (req, res) => {
    const { customerID, employeeID, fooditemID, quantity, paymentMethod } = req.body;

    if (!customerID || !employeeID || !fooditemID || !quantity || !paymentMethod) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'CALL PlaceOrder(?, ?, ?, ?, ?)';
    db.query(sql, [customerID, employeeID, fooditemID, quantity, paymentMethod], (err, results) => {
        if (err) {
            console.error("Error placing order:", err.sqlMessage || err.message);
            return res.status(500).json({ error: 'Failed to place order', details: err.sqlMessage || err.message });
        }

        res.status(201).json({ message: 'Order placed successfully' });
    });
});


// Route to fetch all orders
app.get('/orders', (req, res) => {
    const query = 'SELECT * FROM orders';

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ error: "Failed to fetch orders" });
        }
        res.json(result);
    });
});

app.get('/payments', (req, res) => {
    db.query('SELECT * FROM payment', (err, result) => {
        if (err) {
            console.error("Error fetching payments:", err);
            return res.status(500).json({ error: "Failed to fetch payments" });
        }
        res.json(result);
    });
});


app.post('/payments', (req, res) => {
    const { orderID, amountPaid, paymentMethod } = req.body;

    if (!orderID || !amountPaid || !paymentMethod) {
        return res.status(400).json({ error: 'Missing required payment details' });
    }

    const paymentDate = new Date();
    const query = 'INSERT INTO payment (orderID, AmountPaid, PaymentMethod, PaymentDate) VALUES (?, ?, ?, ?)';

    db.query(query, [orderID, amountPaid, paymentMethod, paymentDate], (err, result) => {
        if (err) {
            console.error("Error processing payment:", err);
            return res.status(500).json({ error: 'Error processing payment', details: err.sqlMessage || err.message });
        }

        res.status(200).json({ message: 'Payment successful' });
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});