# heirloom.shop

# Stack

-   Back-end: Node/Express API
-   Database: PostgreSQL
-   Front-end: React/TypeScript, ChakraUI
-   Authentication: Auth0
-   Hosting: DigitalOcean
-   DevOps: GitHub

# Local DB setup (PostgreSQL)

1. Install PostgreSQL: `brew install postgresql@15`
2. Start it with `brew services start postgresql@15`
3. Open PostgreSQL shell `psql postgres`
    1. Create superuser `CREATE ROLE postgres WITH LOGIN SUPERUSER;`
4. Install dbmate: `brew install dbmate`
5. Install Beekeeper (GUI): https://www.beekeeperstudio.io/get

# Development guide

-   Download Node and NPM
-   Run `npm install` in `client` and `server`
-   Download VS Code and install Prettier extension `ext install esbenp.prettier-vscode`
-   Run API server: `cd server && npm run dev`
-   Run front-end server: `cd client && npm run dev`
    -   Served at localhost:3000

### Migrations

-   Add new migration script with `dbmate new [migration_title]` from the root directory
-   Ensure database URL environment variable is set: `export DATABASE_URL="postgres://postgres@127.0.0.1:5432/heirloomdb?sslmode=disable"`
-   Update database: `DATABASE_URL=postgres://postgres@127.0.0.1:5432/heirloomdb?sslmode=disable dbmate up`
-   Rollback: `dbmate rollback`
-   Update TS entities `NODE_ENV=development npx mikro-orm generate-entities --save --path=src/entities` from the `server` directory

### Data Seeding

-   Basic structural data (e.g. listing categories) and hard-coded admin permissions are set/updated by `seed_base_data.sql`
-   Sample data for non-prod instances is set by `seed_sample_data.sql`
-   Locally, running `seed_data.sh` will run both of the above in sequence

# Infrastructure

-   Hosted on DigitalOcean resources
-   Controlled via Terraform/Doctl
-   Need: DigitalOcean personal access token

### Local Install

```
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
brew install doctl
```

### SSH Config

-   Get access token from Digital Ocean
-   Connect GitHub and Digital Ocean accounts

#### Make Digital Ocean key and get fingerprint

```
doctl auth init
doctl compute ssh-key create "my-key" --public-key "$(cat ~/.ssh/id_rsa.pub)"
```

#### Set token environment variables locally

```
export DIGITALOCEAN_TOKEN="your-token"
export SPACES_ACCESS_KEY_ID="your-access-key"
export SPACES_SECRET_ACCESS_KEY="your-secret-key"
```

### Infrastructure Setup

-   When running for the first time

```
terraform init
```

-   To prevent the chicken-and-egg issue with the Node app and the database firewall run (specifically needed when creating new environment or replacing the app resource)

```
./bootstrap.sh [environment]
```

-   After running the bootstrap script, and for any subsequent runs, run the following

```
terraform apply -var-file=environments/[environment].tfvars
```

##### App database access

The GitHub Actions script "Grant App DB Access" gives read/write access to the application database user. This needs to be run when setting up new environments.

### Run Docker container locally

```
doctl registry login
docker pull registry.digitalocean.com/heirloom-shop/node-app:latest
docker run -it --rm registry.digitalocean.com/heirloom-shop/node-app:latest sh
```
