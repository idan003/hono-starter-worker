# Hono Starter

A hono starter for REST API, with drrizle orm and deploy to worker cloudflare.

## Stack

- Authentication: JWT
- Validation: Zod
- ORM: Drizzle
- DB: D1
- Framework: Hono
- Formatter: Prettier
- Language: TypeScript
- Package Manager: Bun

## Install dependencies

```bash
bun install
```

## Run the app

the config you can found on `wrangler.toml`.
all the VARS or D1 configuration you will found there 

```bash
bun dev
```

```bash
open http://localhost:8787
```

## Important 
for run D1 local you need to run the commands:

```bash
bun db:generate
```

```bash
wrangler d1 execute <DATABASE_NAME> --local --file=./src/db//0000_short_lockheed.sql
```

## Deployment to Worker (Cloudflare PROD)

```bash
bun run deploy
```

D1:

```bash
bun db:push
```

## Migration

### Generate

```bash
bun db:generate
```

### Migrate

```bash
bun db:migrate
```

### Drop

```bash
bun db:drop
```

## License

MIT
