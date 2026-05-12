# 🌶️ Spice Route

### Welcome to Spice Route! 
This is a friendly, easy-to-use restaurant system designed to make ordering and managing food a breeze. Whether you're a customer looking at the delicious menu or a chef keeping track of orders, everything is designed to feel smooth and professional.

---

### 📖 About the Project
I built **Spice Route** because I wanted to create a simple yet elegant solution for small restaurants to manage their daily orders without complex hardware. It bridges the gap between a customer's hunger and a chef's kitchen, providing instant digital bills and a live dashboard to keep everything organized.

---

### ✨ What can it do?

- **For Customers**: 
  - Browse a beautiful menu and add items to your cart.
  - Enter your details and table number to place an order instantly.
  - **New!** Get a digital receipt immediately after ordering that you can actually print.
- **For the Kitchen**:
  - A dedicated "Chef View" to see all incoming orders.
  - Update order status (Pending → Cooking → Ready) so everyone stays in the loop.
- **Behind the Scenes**:
  - Automatically calculates 5% GST for you.
  - Works perfectly on phones, tablets, and computers.
  - Ready to be put online using Vercel.

---

### 🚀 How to run it on your computer

Running this project is simple! Just follow these steps:

1. **Get the code**: Download or clone this folder to your computer.
2. **Open your terminal**: Navigate to the `RESTAURANT-MENU` folder.
3. **Set up the environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # If you're on Windows, use: venv\Scripts\activate
   ```
4. **Install the "ingredients"**:
   ```bash
   pip install -r requirements.txt
   ```
5. **Start the server**:
   ```bash
   python indian_bistro/app.py
   ```
6. **Enjoy!**: Open [http://127.0.0.1:5001](http://127.0.0.1:5001) in your browser.

---

### ☁️ Putting it online
Want to show it to the world? I've already included a `vercel.json` file. This means you can easily deploy it to **Vercel** with just a few clicks.

---

### 🛠️ What's under the hood?
I kept things clean and simple:
- **Backend**: Python with the Flask framework.
- **Frontend**: Good old HTML, CSS, and Vanilla JavaScript.
- **Design**: Modern Inter font and a custom "Spice" color palette.

---
*Created as a learning project to explore web development and restaurant automation.*
