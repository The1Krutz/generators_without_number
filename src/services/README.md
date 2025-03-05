# Services

These handle the business logic between the Repo db layer and the Routes connection layer

These can also be created without a corresponding Router for things that exist in the database but are not exposed to the client-facing api. In that case, other Services will be calling into this.