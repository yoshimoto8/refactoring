import { Rental } from "./Rental";
import { Movie } from "./movie";

export class Customer {
  private _name: string;
  private _rentals: Rental[] = [];

  public constructor(name: string) {
    this._name = name;
  }

  public addRental(arg: Rental): void {
    this._rentals.push(arg);
  }

  public getName(): string {
    return this._name;
  }

  public statement(): string {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    const rentals: Rental[] = this._rentals;

    let result = "Rental Record for" + this.getName() + "\n";

    rentals.map((item: Rental) => {
      let thisAmount = 0;
      switch (item.getMovie().getPriceCode()) {
        case Movie.REGULAR:
          thisAmount += 2;
          if (item.getDaysRented() > 2) {
            thisAmount += item.getDaysRented() - 2 + 1.5;
          }
          break;
        case Movie.NEW_RELEASE:
          thisAmount += item.getDaysRented() * 3;
          break;
        case Movie.CHILDRENS:
          thisAmount += 1.5;
          if (item.getDaysRented() > 3) {
            thisAmount += (item.getDaysRented() - 3) * 1.5;
          }
          break;
      }

      frequentRenterPoints++;

      if (
        item.getMovie().getPriceCode() == Movie.NEW_RELEASE &&
        item.getDaysRented() > 1
      ) {
        frequentRenterPoints++;
      }

      result +=
        "\t" + item.getMovie().getTitle() + "\t" + String(thisAmount) + "\n";
      totalAmount += thisAmount;
    });

    result += "Amount owed is " + String(totalAmount) + "\n";
    result +=
      "You earned" + String(frequentRenterPoints) + "frequent renter points";
    return result;
  }
}
