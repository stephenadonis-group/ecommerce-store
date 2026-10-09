import { useSelector } from "react-redux";

import EmptyWishlist from "../Compmonents/Wishlist/EmptyWishlist";
import ProductsWishlist from "../Compmonents/Wishlist/ProductsWishlist";
import Features from "../Compmonents/home/Features";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const allPoructs = useSelector((state) => state.homePage.allProducts);

  const wishlistProducts = allPoructs?.products?.filter((item) =>
    wishlist.includes(item.id),
  );

  return (
    <>
      {wishlistProducts?.length > 0 ? (
        <ProductsWishlist wishlistProducts={wishlistProducts} />
      ) : (
        <EmptyWishlist />
      )}
      <Features />
    </>
  );
}
