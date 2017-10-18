# pyrite-server-validations

- More information about object config in [https://validatejs.org/](https://validatejs.org/)

## Install

- Decorators feature has to be enabled.

```
npm install pyrite-server
npm install pyrite-server-validations
```

## Example

### main.js

```typescript
import { PyriteServer } from "pyrite-server";
import { ValidationPlugin } from "pyrite-server-validations";

const server = new PyriteServer({
  port: 8000,
  routes: "/routes",
  plugins: [new ValidationPlugin()]
});

server.listen(() => {
  console.log("Server running!");
});
```

### /routes folder:
  ### users.js
  
```typescript
import { Route, Post, Body } from "pyrite-server";
import { Validation } from "pyrite-server-validations";

const createValidation = {
  username: {
    format: {
      pattern: "[a-z0-9]+",
      flags: "i",
      message: "can only contain a-z and 0-9"
    }
  },
  password: {
    presence: true
  }
};

const users = [];
let index = 0;

@Route("/users")
export class Users {

  @Post("/")
  @Validation(createValidation)
  createUser(@Body user) {
    user.id = index++;

    users.push(user);

    return user;
  }
}
```
