'use client';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function AddToCartButton({ product, style }: { product: Product, style?: React.CSSProperties }) {
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <button 
      className="btn-primary" 
      style={{ width: '100%', ...style }} 
      onClick={handleAdd}
    >
      Thêm Vào Giỏ
    </button>
  );
}
