import { Module } from "@nestjs/common";

import { HttpStrategy } from "./http.strategy";
import {Auth0PermissionGuard} from "./permissions.guard";

@Module({
  imports: [],
  providers: [HttpStrategy, Auth0PermissionGuard],
  exports: [Auth0PermissionGuard],
})
export class Auth0Module {}
