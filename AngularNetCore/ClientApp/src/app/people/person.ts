import { IAddress } from "../addresses/address";

export interface IPerson {
  addresses: IAddress[],
  id: number,
  name: string,
  birthDate: Date
}
