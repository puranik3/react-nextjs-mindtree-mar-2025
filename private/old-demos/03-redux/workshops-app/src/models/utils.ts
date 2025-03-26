// enum Theme {
//   primary = 'primary',
//   secondary = 'secondary'
// }

// type literals
type Theme = 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'info'
  | 'warning'
  | 'light'
  | 'dark';

// let rating : 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// rating = 11; // error
// rating = 10;
// rating = 1;
// rating = 0; // error

type VoteType = 'upvote' | 'downvote';

export type { Theme, VoteType };