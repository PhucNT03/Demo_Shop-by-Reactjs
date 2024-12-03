import { useState, useEffect } from 'react';

export const useCartFetch = () =>{
    const [cart, setCart] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        return storedCart || [];
    });

    const [cartCount, setCartCount] = useState(() => {
        const storedCount = JSON.parse(localStorage.getItem('cartCount'));
        return storedCount || 0;
    });

    const [userAccount, setUserAccount] = useState(() => {
        const storedAccount = JSON.parse(localStorage.getItem('accounts'));
        return storedAccount || {};
    });

    useEffect(() => {
        localStorage.setItem('cartCount', JSON.stringify(cartCount));
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cartCount, cart]);

    return { cart, setCart, cartCount, setCartCount, userAccount };
};
