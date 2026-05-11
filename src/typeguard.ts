// type guard


// in guard
type NormalUser = {
    name: string;
}

type AdminUser = {
    name: string;
    role: string;
}

const getUser = (user: NormalUser | AdminUser) => {
    if ('role' in user) {
        return `Admin User: ${user.name}, Role: ${user.role}`;
    } else {
        return `Normal User: ${user.name}`;
    }
}

console.log(getUser({ name: "Alice" }));
console.log(getUser({ name: "Bob", role: "Admin" }));