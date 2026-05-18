import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="card group cursor-pointer">
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1 group-hover:text-indigo-600 transition">{product.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-indigo-600 font-bold text-lg">${product.price_usd}</span>
          <Link href={`/product/${product.id}`} className="btn-primary text-sm py-2 px-4">View</Link>
        </div>
      </div>
    </div>
  );
}