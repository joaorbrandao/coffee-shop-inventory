# Documentation

## Table of Content
- [Pre Development Process](./starbucks-coffee-shop-inventory.excalidraw)
- [Project Organization](#project-organization)
- [Source Code Organization](#source-code-organization)

In this [file](./starbucks-coffee-shop-inventory.excalidraw) you'll find the pre-development process used to design the current solution.

## Project Organization

`database` - A place to save some useful SQL files,

`docs` - Project documentation.

`scripts` - A place to save some useful scripts (e.g. development, deployment, ...)

`src` - The source code for the application to run.

`test` - A folder for e2e testing.

## Source Code Organization

The code is organized in domains: `categories`, `health`, `orders`, `payments` and `products`.

Each domain can handle e2e flows inside its responsibility. <br>
When an outside domain needs to access specific functionalities of another, it uses a `Facade` class that abstracts all other functionalities that are `private` by default.

The `health` domain is a special one that its only responsibility is providing a health check endpoint, so we can verify
that the application is running, ready to be used or that is not stuck in some invalid status.

`controllers` - the set of endpoints for the REST API.

`entities` - the domain modeling for the database.

`exceptions` - custom errors that represent invalid operations mapped to an HTTP custom response.

`models` - useful classes only used inside the project and are not exposed to neither client or database.

`services` - representation of the service and business logic layer.
