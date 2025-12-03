import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    // Agregar producto al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };

    // Calcular total de items (para el contador del Navbar)
    const cantidadEnCarrito = carrito.length;

    return (
        <CartContext.Provider value={{ carrito, agregarAlCarrito, cantidadEnCarrito }}>
            {children}
        </CartContext.Provider>
    );
};