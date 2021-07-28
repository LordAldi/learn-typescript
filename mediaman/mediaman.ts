console.log("MediaMan - Loading...");

console.log("MediaMan loaded");

enum Genre {
  Horror = "Horror",
  Fantastic = "Fantastic",
  Thriller = "Thriller",
  Romance = "Romance",
  Fiction = "Fiction",
}

abstract class Media {
  private _identifier: string;

  protected constructor(
    private _name: string,
    private _description: string,
    private _pictureLocation: string,
    private _genre: Genre,
    identifier?: string
  ) {
    if (identifier) {
      this._identifier = identifier;
    } else {
      // this is just for the example; for any real project, use
      // UUIDs instead: https://www.npmjs.com/package/uuid
      this._identifier = Math.random().toString(36).substr(2, 9);
    }
  }

  get identifier(): string {
    return this._identifier;
  }
  set identifier(identifier: string) {
    this._identifier = identifier;
  }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get description(): string {
    return this._description;
  }
  set description(description: string) {
    this._description = description;
  }

  get pictureLocation(): string {
    return this._pictureLocation;
  }
  set pictureLocation(pictureLocation: string) {
    this._pictureLocation = pictureLocation;
  }

  get genre(): Genre {
    return this._genre;
  }
  set genre(genre: Genre) {
    this._genre = genre;
  }
}

class Book extends Media {
  private _author: string;
  private _numberOfPages: number;

  constructor(
    name: string,
    description: string,
    pictureLocation: string,
    genre: Genre,
    author: string,
    numberOfPages: number,
    identifier?: string
  ) {
    super(name, description, pictureLocation, genre, identifier);
    this._numberOfPages = numberOfPages;
    this._author = author;
  }

  get author(): string {
    return this._author;
  }
  set author(author: string) {
    this._author = author;
  }

  get numberOfPages(): number {
    return this._numberOfPages;
  }
  set numberOfPages(numberOfPages: number) {
    this._numberOfPages = numberOfPages;
  }
}
