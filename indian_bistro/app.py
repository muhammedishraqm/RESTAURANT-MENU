from flask import Flask, render_template, request, jsonify
import datetime
import uuid

app = Flask(__name__)

# In-memory storage for orders
# Each order will look like:
# {
#     "id": "123",
#     "customer_name": "John",
#     "table_number": "5",
#     "phone": "9876543210",
#     "items": [{"name": "Dosa", "quantity": 2, "price": 70}],
#     "subtotal": 140,
#     "gst": 7.0,
#     "total": 147.0,
#     "status": "Pending", # Pending -> Cooking -> Ready
#     "timestamp": "2023-10-27 10:00:00"
# }
orders = []

# Menu data
MENU = [
    {"id": 1, "name": "Idli", "price": 40},
    {"id": 2, "name": "Dosa", "price": 70},
    {"id": 3, "name": "Paneer Butter Masala", "price": 160},
    {"id": 4, "name": "Veg Biryani", "price": 140},
    {"id": 5, "name": "Butter Naan", "price": 30}
]

@app.route('/')
def index():
    """Customer View - Show Menu"""
    return render_template('index.html', menu=MENU)

@app.route('/kitchen')
def kitchen():
    """Chef View - Show All Orders"""
    return render_template('kitchen.html', orders=orders)

@app.route('/api/place-order', methods=['POST'])
def place_order():
    """Endpoint to receive new orders from customers"""
    data = request.json
    
    # Simple validation
    if not data or not data.get('cart') or not data.get('customer'):
        return jsonify({"success": False, "message": "Invalid order data"}), 400
    
    customer = data['customer']
    cart = data['cart']
    
    # Calculate totals again on backend for security/accuracy
    subtotal = 0
    order_items = []
    for item in cart:
        # Find price from our MENU data
        menu_item = next((m for m in MENU if m['name'] == item['name']), None)
        if menu_item:
            price = menu_item['price']
            qty = int(item['quantity'])
            subtotal += price * qty
            order_items.append({
                "name": item['name'],
                "quantity": qty,
                "price": price
            })
    
    gst = round(subtotal * 0.05, 2)
    total = subtotal + gst
    
    new_order = {
        "id": str(uuid.uuid4())[:8], # Short unique ID
        "customer_name": customer.get('name'),
        "table_number": customer.get('table'),
        "phone": customer.get('phone'),
        "order_items": order_items,
        "subtotal": subtotal,
        "gst": gst,
        "total": total,
        "status": "Pending",
        "timestamp": datetime.datetime.now().strftime("%I:%M %p")
    }
    
    orders.append(new_order)
    return jsonify({"success": True, "order_id": new_order['id']})

@app.route('/api/update-status', methods=['POST'])
def update_status():
    """Endpoint for Chef to update order status"""
    data = request.json
    order_id = data.get('order_id')
    new_status = data.get('status')
    
    for order in orders:
        if order['id'] == order_id:
            order['status'] = new_status
            return jsonify({"success": True})
            
    return jsonify({"success": False, "message": "Order not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)
