import { toast , Bounce} from "react-toastify";

export const addToCart = (product, cart, setCart, cartCount, setCartCount) => {
    const authenticated = localStorage.getItem('accounts');
    if (!authenticated) {
        toast.error('Please login first to add product to cart', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        return;
    }
    if (product.status === false) {
        toast.error('Product is out of stock', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        return;
    }
    let storedCart = JSON.parse(JSON.stringify(cart));
    let updatedCart = [];
    let updatedCount = cartCount;

    const ProductExist = storedCart.findIndex(item => item.id === product.id);

    if (ProductExist !== -1) {
        storedCart[ProductExist].quantity = (storedCart[ProductExist].quantity || 1) + 1;
        updatedCart = [...storedCart];
    } else {
        product.quantity = 1;
        updatedCart = [...storedCart, product];
        updatedCount++;
    }
    setCart(updatedCart);
    setCartCount(updatedCount);
}