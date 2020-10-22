> ideation
1) problem statement
  - i want to define the problem to solve
2) user stories
  - identify the pain points and areas to solve
  - identify user patterns and interaction to best implement solutions
3) 

> user flow

> schema

> implementation
- SERVER
  - express
  - middlewares
  - static
    - dev setup
      - proxy the requests to the server on 5000
    - production setup  
      - read static files from the build folders
      - serve all non api to either the admin or public site
  - SSE
  - routes
  - db
  - controllers
  - models
  - utility
  - loggers
  - security

  
- CLIENTS
  - admin spa
  - business spa
  - user spa

  > create spa structure
    - assets
    - common
    - domain
    - utility
    - index
    - setupTest

    - error catching
    - css reset