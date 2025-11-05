// Esta clase debe de coincidir con el JSON que nos va a devolver el back que hicimos con Spring Boot
export class Product {
  constructor(
    public _sku: string,
    public _name: string,
    public _description: string,
    public _unitPrice: number,
    public _imageUrl: string,
    public _active: boolean,
    public _unitsInStock: number,
    public _dateCreate: Date,
    public _lastUpdated: Date
  ) {}
}
