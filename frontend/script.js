document.addEventListener("DOMContentLoaded", () => {
    const employeeTableBody = document.querySelector("#employee-table tbody");
    const addEmployeeBtn = document.getElementById("add-employee-btn");
    const addEmployeeForm = document.getElementById("add-employee-form");
    const cancelAddEmployeeBtn = document.getElementById("cancel-add-employee");
    const newEmployeeForm = document.getElementById("new-employee-form");

    addEmployeeBtn.addEventListener("click", () => {
        addEmployeeForm.style.display = "block";
    });

    cancelAddEmployeeBtn.addEventListener("click", () => {
        addEmployeeForm.style.display = "none";
    });

    newEmployeeForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const employeeData = {
            name: document.getElementById("employee-name").value,
            role: document.getElementById("employee-role").value,
            phone: document.getElementById("employee-phone").value,
            email: document.getElementById("employee-email").value,
            salary: document.getElementById("employee-salary").value,
            username: document.getElementById("employee-username").value,
            password: document.getElementById("employee-password").value,
            averageRating: document.getElementById("employee-rating").value
        };

        try {
            const response = await fetch('http://localhost:3000/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeData)
            });

            const result = await response.json();
            if (result.message === 'Employee added successfully') {
                alert("Employee added successfully!");
                loadEmployees();
                addEmployeeForm.style.display = "none";
                newEmployeeForm.reset();
            } else {
                alert("Error adding employee!");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("There was an error adding the employee!");
        }
    });

    async function loadEmployees() {
        try {
            const response = await fetch('http://localhost:3000/employees');
            const employees = await response.json();
            employeeTableBody.innerHTML = "";
            employees.forEach(employee => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${employee.Name}</td>
                    <td>${employee.Role}</td>
                    <td>${employee.PhoneNumber}</td>
                    <td>${employee.Email}</td>
                    <td>${employee.Salary}</td>
                `;
                employeeTableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error loading employees:", error);
        }
    }

    loadEmployees();
});

document.addEventListener("DOMContentLoaded", () => {
    const customerTableBody = document.querySelector("#customer-table tbody");
    const addCustomerBtn = document.getElementById("add-customer-btn");
    const addCustomerForm = document.getElementById("add-customer-form");
    const newCustomerForm = document.getElementById("new-customer-form");
    const cancelAddCustomerBtn = document.getElementById("cancel-add-customer");

    addCustomerBtn.addEventListener("click", () => {
        addCustomerForm.style.display = "block";
    });

    cancelAddCustomerBtn.addEventListener("click", () => {
        addCustomerForm.style.display = "none";
    });

    newCustomerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const customerData = {
            name: document.getElementById("customer-name").value,
            phone: document.getElementById("customer-phone").value,
            email: document.getElementById("customer-email").value
        };

        try {
            const response = await fetch('http://localhost:3000/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customerData)
            });

            const result = await response.json();
            if (result.message === 'Customer added successfully') {
                alert("Customer added successfully!");
                loadCustomers();
                addCustomerForm.style.display = "none";
                newCustomerForm.reset();
            } else {
                alert("Error adding customer!");
            }
        } catch (error) {
            console.error("Error adding customer:", error);
            alert("There was an error adding the customer!");
        }
    });

    async function loadCustomers() {
        try {
            const response = await fetch('http://localhost:3000/customers');
            const customers = await response.json();
            customerTableBody.innerHTML = "";
            customers.forEach(customer => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${customer.Name}</td>
                    <td>${customer.PhoneNumber}</td>
                    <td>${customer.Email}</td>
                `;
                customerTableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error loading customers:", error);
        }
    }

    loadCustomers();
});

document.addEventListener("DOMContentLoaded", () => {
    const fooditemTableBody = document.querySelector("#fooditem-table tbody");
    const addFooditemBtn = document.getElementById("add-fooditem-btn");
    const addFooditemForm = document.getElementById("add-fooditem-form");
    const cancelAddFooditemBtn = document.getElementById("cancel-add-fooditem");
    const newFooditemForm = document.getElementById("new-fooditem-form");

    addFooditemBtn.addEventListener("click", () => {
        addFooditemForm.style.display = "block";
    });

    cancelAddFooditemBtn.addEventListener("click", () => {
        addFooditemForm.style.display = "none";
    });

    newFooditemForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fooditemData = {
            name: document.getElementById("food-name").value,
            category: document.getElementById("food-category").value,
            price: document.getElementById("food-price").value,
            description: document.getElementById("food-description").value,
        };

        try {
            const response = await fetch('http://localhost:3000/fooditems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fooditemData)
            });

            const result = await response.json();
            if (result.message === 'Food item added successfully') {
                alert("Food item added successfully!");
                loadFooditems();
                addFooditemForm.style.display = "none";
                newFooditemForm.reset();
            } else {
                alert("Error adding food item!");
            }
        } catch (error) {
            console.error("Error adding food item:", error);
            alert("There was an error adding the food item!");
        }
    });

    async function loadFooditems() {
     try {
         const response = await fetch('http://localhost:3000/fooditems');
         const fooditems = await response.json();
         console.log(fooditems);

         fooditemTableBody.innerHTML = ""; 

         fooditems.forEach(item => {
             const row = document.createElement("tr");
             row.innerHTML = `
                 <td>${item.Name}</td>
                 <td>${item.Category}</td>
                 <td>${item.Price}</td>
                 <td>${item.description || 'No description'}</td>
             `;
             fooditemTableBody.appendChild(row);
         });
     } catch (error) {
         console.error("Error loading food items:", error);
     }
 }

    loadFooditems();
});

document.addEventListener("DOMContentLoaded", () => {
    const inventoryTableBody = document.querySelector("#inventory-table tbody");
    const addInventoryBtn = document.getElementById("add-inventory-btn");
    const addInventoryForm = document.getElementById("add-inventory-form");
    const cancelAddInventory = document.getElementById("cancel-add-inventory");
    const newInventoryForm = document.getElementById("new-inventory-form");

    addInventoryBtn.addEventListener("click", () => {
        addInventoryForm.style.display = "block";
    });

    cancelAddInventory.addEventListener("click", () => {
        addInventoryForm.style.display = "none";
    });

    newInventoryForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("inventory-name").value.trim();
        const quantityInStock = parseFloat(document.getElementById("inventory-quantity").value);
        const unit = document.getElementById("inventory-unit").value.trim();

        if (!name || isNaN(quantityInStock) || !unit) {
            alert("Please fill all fields correctly.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/inventory`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, quantityInStock, unit }),
            });

            if (response.ok) {
                addInventoryForm.style.display = "none";
                loadInventory();
                newInventoryForm.reset();
            } else {
                const errData = await response.json();
                alert("Error adding inventory item: " + (errData.error || 'Unknown error'));
            }
        } catch (error) {
            console.error("Error adding inventory:", error);
            alert("Error adding inventory item");
        }
    });

    async function loadInventory() {
        try {
            const response = await fetch(`http://localhost:3000/inventory`);
            const inventory = await response.json();
            console.log("Inventory data loaded:", inventory);  

            inventoryTableBody.innerHTML = "";

            inventory.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.Name}</td>
                    <td>${item.QuantityInStock}</td>
                    <td>${item.Unit}</td>
                    <td>${new Date(item.LastUpdated).toLocaleDateString()}</td>
                `;
                inventoryTableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error loading inventory:", error);
        }
    }

    loadInventory();
});


document.addEventListener("DOMContentLoaded", () => {
    const paymentTableBody = document.querySelector("#payments-table tbody");
    if (!paymentTableBody) return; 

    async function loadPayments() {
        try {
            const response = await fetch('http://localhost:3000/payments');
            const payments = await response.json();

            paymentTableBody.innerHTML = ""; 
            payments.forEach(payment => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${payment.orderID}</td>
                    <td>${payment.AmountPaid}</td>
                    <td>${payment.PaymentMethod}</td>
                    <td>${new Date(payment.PaymentDate).toLocaleString()}</td>
                `;
                paymentTableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error loading payments:", error);
        }
    }

    loadPayments();
});




// Load food items into the dropdown for placing orders
document.addEventListener("DOMContentLoaded", () => {
    const orderItemsSelect = document.getElementById("order-items");

    if (orderItemsSelect) {
        fetch('http://localhost:3000/fooditems')
            .then(response => response.json())
            .then(data => {
                orderItemsSelect.innerHTML = "";
                data.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.fooditemID; // Ensure this ID exists
                    option.textContent = `${item.Name}`;
                    orderItemsSelect.appendChild(option);
                });
            })
            .catch(err => {
                console.error("Failed to fetch food items:", err);
            });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const orderForm = document.getElementById("place-order-form");

    if (orderForm) {
        orderForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = {
                customerID: document.getElementById("customer-id").value,
                employeeID: document.getElementById("employee-id").value,
                fooditemID: document.getElementById("order-items").value,
                quantity: document.getElementById("quantity").value,
                paymentMethod: document.getElementById("payment-method")?.value || "Cash"
            };

            try {
                const response = await fetch('http://localhost:3000/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                } else {
                    alert(result.error || "Error placing order");
                    console.error(result.details);
                }
            } catch (error) {
                console.error("Error placing order:", error);
                alert("Failed to place the order");
            }
        });
    }
});


