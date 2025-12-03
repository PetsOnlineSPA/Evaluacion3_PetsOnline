import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };

    const cantidadEnCarrito = carrito.length;

    return (
        <CartContext.Provider value={{ carrito, agregarAlCarrito, cantidadEnCarrito }}>
            {children}
        </CartContext.Provider>
    );
};