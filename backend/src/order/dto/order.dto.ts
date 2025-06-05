export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: {
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
