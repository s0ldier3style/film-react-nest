export class CreateOrderDto {
  id?: number;
  email: string;
  phone: string;
  tickets: {
    id?: number;
    film: string;
    session: string;
    daytime: string;
    day: string;
    time: string;
    row: number;
    seat: number;
    price: number;
  }[];
}
