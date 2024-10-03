import { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/api';
import { ProductCard } from '../cards/Product';
import { Button } from '../button';
import { useFilterContext } from '../../contexts/filters';
import { IProduct } from '../../interfaces/product';

export const Products = () => {
  const { filters, query } = useFilterContext();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {
          code: query || undefined,
          energyClass: filters.energyClass ? filters.energyClass.join(',') : undefined,
          capacity: filters.capacity ? filters.capacity.join(',') : undefined,
          features: filters.feature ? filters.feature.join(',') : undefined,
          sortBy: filters.sort || undefined,
          order: filters.sort ? 'asc' : undefined,
          page,
          limit: 10,
        };
        const data = await fetchProducts(params);
        if (page === 1) {
          setProducts(data);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data]);
        }
        setHasMore(data.length === 10);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [filters, query, page]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filters, query]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (products.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500 text-xl mt-4">
          Brak produktów spełniających kryteria wyszukiwania
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.code} {...product} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Button variant="primary" onClick={handleLoadMore} value="Pokaż więcej" />
          )}
        </div>
      )}
    </>
  );
};
