// Esta clase debe de coincidir con el JSON que nos va a devolver el back que hicimos con Spring Boot
export class Product {
  constructor(
    public id: number,
    public sku: string,
    public name: string,
    public description: string,
    public unitPrice: number,
    public imageUrl: string,
    public active: boolean,
    public unitsInStock: number,
    public dateCreate: Date,
    public lastUpdated: Date
  ) {}
}
