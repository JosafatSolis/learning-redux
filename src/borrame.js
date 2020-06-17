import axios from "axios";


export const getProducts = () => {
    return axios.get("http://localhost:4000/products");
};

export const postProduct = (item) => {
    return axios.post("http://localhost:4000/products");
}

// Get all Carts
export const getCarts = () => {
    return axios.get("http://localhost:4000/carts?_embed=items");
};

// Get all items from a Card
export const getCart = (cartId) => {
    return axios.get(`http://localhost:4000/carts/${cartId}?_embed=items`);
};

// Post New Cart
export const postCart = (cart) => {
    return axios.post("http://localhost:4000/carts", cart);
};

// Update Cart
export const putCard = (cart) => {
    return axios.put(`http://localhost:4000/carts/${cart.id}`, cart);
}

// Add item to Cart
export const addItem = (cartId, item) => {
    return axios.post(`http://localhost:4000/carts/${cartId}/items`, item);
};

// Remove item
export const removeItem = (itemId) => {
    return axios.delete(`http://localhost:4000/items/${itemId}`);
}

