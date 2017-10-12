# pyrite-server-validations

- more information about object config in [[validatejs|https://validatejs.org/]]

## Install

- Decorators feature has to be enabled.

```
npm install pyrite-server
npm install pyrite-server-validations
```

## Example

### main.js

```typescript
import { Server } from "pyrite-server";
import { ValidationPlugin } from "pyrite-server-validations";

const server = new Server({
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
class Users {

  @Post("/")
  @Validation(createValidation)
  createUser(@Body user) {
    user.id = index++;

    users.push(user);

    return user;
  }
}
```
