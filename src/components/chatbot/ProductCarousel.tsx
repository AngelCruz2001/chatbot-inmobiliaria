import React from "react";
import { Product } from "../../types/Product";

interface ProductCarouselProps {
  products: Product[];
  onAction: (action: string, product: Product) => void; 

}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onAction }) => {
  return (
    <div className="flex overflow-x-scroll space-x-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="min-w-[200px] bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-40 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg text-primary">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold text-accent mt-2">{product.price}</p>
            {product.actions?.map((action) => (
              <button
                key={action}
                onClick={() => onAction(action, product)}
                className="mt-2 text-sm bg-primary text-white px-4 py-1 rounded hover:bg-purple-700"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;
