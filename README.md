# Auth0 module for Nest.js
## Motivation
I would like to provide an example implementation for Nest.js - Auth0 integration with a detailed guide for setting the system up.

## Prerequisites
- Nest.js application (link).
- Auth0 subscription (link).
- **Regular Web Application** is set up in Auth0.

## Installation
```shell
npm i nestjs-auth0 @nestjs/passport rxjs
```
The project has additional peer dependencies that are assumed to be covered by the host Nest.js application.

## Setup
### Parameters
| Environment variable | Description             |
| -------------------- | ----------------------- |
| AUTH0_CLIENT_ID      |                         |
| AUTH0_ISSUER         | <YOUR_DOMAIN>.auth0.com |

## Usage
### Importing module
```typescript
@Module({
  imports: [Auth0Module, PassportModule.register({ defaultStrategy: "bearer" })],
  providers: [Auth0PermissionsGuard],
  exports: [Auth0Module, PassportModule],
})
export class AppModule {}
```
### Securing endpoints
Annotate endpont with `@UseGuards` to request authentication (see at [Nest.js documentation for authentication](https://docs.nestjs.com/security/authentication)).
```typescript
  @UseGuards(AuthGuard())
  @Get("items")
  getItems(): any[] {
    // Some code
  }
```

### Evaluate user permissions
Generate a permission decorator.
```bash
nest generate decorator permissions
```

Add `Auth0PermissionsGuard` as parameter to `@UseGuards` in order to evaluate user permissions provided by Auth0.

Add the `@Permission` decorator to declare expected route permissions.
```typescript
  @UseGuards(AuthGuard(), Auth0PermissionsGuard)
  @Post("items")
  @Permissions("write:items")
  add(): void {
    // Some code
  }
```

### Accessing user data
Create a decorator with the following content:
```typescript
export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```
The decorator passes the user object to the annotated method.
```typescript
  @Get("/user")
  @UseGuards(AuthGuard())
  getUser(@User() user: any): any {
    // Some code
  }
```
The use object is fetched from Auth0's Authentication API by the provided HttpStrategy.
```typescript
const profile = await this.authenticationClient.getProfile(token);
```

## Extension points
TBD
