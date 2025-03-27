interface User {
    id: number;
    name: string;
    email?: string;
}

// interface UserWithMoreProperties extends User {

// }

// Omit
// interface User {
//     id: number;
//     name: string;
// }

// type UserWithoutEmail = Omit<User, "email" | "name">;
type UserWithoutEmail = Omit<User, "email">;

const john: UserWithoutEmail = {
    id: 1,
    name: "John",
    // email: 'john@gmail.com' // error
};

type PartialUser = Partial<User>;

const jane: PartialUser = {
    id: 2,
    // name: 'Jane',
    email: "jane@gmail.com",
};

type UserContact = Pick<User, "name" | "email">;

type CompleteUser = Required<User>;

type OptionalNameAndEmail = Partial<Pick<User, "name" | "email">>;
