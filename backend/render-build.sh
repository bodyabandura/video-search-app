   #!/usr/bin/env bash
   # Build the app
   npm install
   npm run build
   # Run migrations
   npx mikro-orm migration:up