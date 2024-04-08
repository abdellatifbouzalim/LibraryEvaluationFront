interface Review {
    id?: number;
    comment: string;
    stars: number;
    date: string;
    book: Book;
    user: User;
  }
  