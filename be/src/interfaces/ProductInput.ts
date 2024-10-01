export interface IProductInput {
  image: string;
  code: string;
  name: string;
  color: string;
  capacity: number;
  dimensions: string;
  features: string[];
  energyClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  price: {
    value: number;
    currency: string;
    installment: {
      value: number;
      period: number;
    };
    validFrom: Date;
    validTo: Date;
  };
}
