import { Button } from '../../button';
import { IProduct } from '../../../interfaces/product';
import { parseCurrency } from '../../../utils/parseCurrency';
import { useCartContext } from '../../../contexts/cart';
import { EnergyBadge } from '../../badge/Energy';

export const ProductCard = (props: IProduct) => {
  const { items, setItems } = useCartContext();
  const { code, name, capacity, color, dimensions, features, energyClass, price, image } = props;
  const { value, currency, installment, validTo, validFrom } = price;

  const parseTitle = `${code}, ${name}, ${capacity}kg, ${color}`;
  const parseFeatures = features.join(', ');

  const addToCart = (product: IProduct) => {
    setItems([...items, product]);
  };

  const removeFromCart = (product: IProduct) => {
    const filteredItems = items.filter((item) => item.code !== product.code);
    setItems(filteredItems);
  };

  const isInCart = items.some((item) => item.code === code);

  const handleAddToCart = () => {
    isInCart ? removeFromCart(props) : addToCart(props);
  };

  const validFromDate = new Date(validFrom);
  const validToDate = new Date(validTo);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Image */}
      <div className={'flex justify-center my-4'}>
        <img src={image} alt={name} className="h-48 object-cover rounded-2xl" />
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col space-y-2 p-4">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900">{parseTitle}</h3>

        {/* Features */}
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Funkcje:</span> {parseFeatures}
        </p>

        {/* Capacity and Dimensions */}
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Pojemność(kg):</span> {capacity}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Wymiary(GxSxW):</span> {dimensions}
        </p>

        {/* Energy Class */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Klasa energetyczna:</span>
          </p>
          <EnergyBadge energyClass={energyClass} />
        </div>

        {/* Validity Dates */}
        <p className="text-sm text-gray-500">
          Cena obowiązuje od {validFromDate.toLocaleDateString()} do{' '}
          {validToDate.toLocaleDateString()}
        </p>

        {/* Price and Installment */}
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-medium text-gray-900">
            {parseCurrency(value).unit}.{parseCurrency(value).decimal} {currency}
          </p>
          <p className="text-base text-gray-700 font-bold">
            {installment.value} {currency} x {installment.period} rat
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant={isInCart ? 'secondary' : 'primary'}
            value={isInCart ? 'Wybrano' : 'Wybierz'}
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};
