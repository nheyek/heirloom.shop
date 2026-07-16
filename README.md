# Introduction

Heirloom is an exclusive online marketplace for handcrafted products from workshops across the world, offering curated, authentic discovery and a low, transparent comission structure in place of the mass-produced listings and pay-to-play noise that plague platforms like Etsy and Amazon.

## Background

There are countless workshops across the world making incredible handcrafted products. Finding them can be a challenge. When searching for handcrafted products, Google and Amazon will show endless promoted listings that describe themselves in those terms, but are really mass produced, drop-shipped junk.

There’s Etsy, but it too is overrun by these deceptive listings. The genuinely handcrafted products that do exist on Etsy are largely kitschy, gift shop-type things. The air of unseriousness on the platform is best exemplified by “Etsy witches” who provide “metaphysical services” for a fee.

## Vision

### For Customers

Heirloom seeks to offer an alternative to the situation described above. Unlike other online marketplaces, every Heirloom storefront belongs to the workshop that actually makes the things that they sell. Membership is invite-only and extremely selective. Every listing prominently displays where the product is made, and sellers are encouraged to include details on how it’s made, and by whom.

This highly curated collection of storefronts is combined with a carefully constructed, streamlined UI and ease-of-use features that optimize for authentic discovery and refrain from inundating customers with marketing content. The result is a genuinely unique experience that we hope will attract and retain customers.

### For Sellers

To attract customers, Heirloom must first attract makers. What’s in it for them?

The lifeblood of all online commerce is discoverability. The section above describes how the conditions of online commerce make it difficult for customers to find Heirloom-type products. Those same conditions make it expensive for makers of those products to find customers. Targeted ads from Instagram and TikTok are effective, but very costly. On Heirloom, customers of one storefront are within the target audience of many other storefront. As a result, inclusion on the platform comes with a significant amount of organic discoverability.

Like other marketplaces, Heirloom will charge a commission on each sale. Unlike other marketplaces, it will not be exorbitant (like Amazon’s 15%), and it will be the only cost; In order to optimize authentic discovery, there will be no pay-to-play system of promoted listings. Visibility will be determined entirely by relevance and reputation. Many Heirloom-type makers already have their own commission-free online stores, but attracting customers incurs an “effective commission” in ad spend, typically far in excess of the Heirloom commission.

# Environments
* Dev: https://dev.heirloom.shop

# Stack
* Back-end: TypeScript (Node/Express 5), with [ts-rest](https://ts-rest.com/) for contract-first API definitions shared with the front-end
* Front-end: TypeScript (React 19), Chakra UI, webpack/webpack-dev-server
* Shared: a `common` workspace holding the ts-rest/zod API contract and validation/domain logic used by both `server` and `client`
* Database: PostgreSQL, accessed via MikroORM; schema migrations managed with [dbmate](https://github.com/amacneil/dbmate) (`db/migrations`, `db/schema.sql`)
* Auth: Auth0 (`@auth0/auth0-react` on the front-end, `express-oauth2-jwt-bearer` on the back-end)
* Payments: Stripe (Stripe Elements on the front-end, Stripe webhooks on the back-end)
* Email: Resend
* Testing: Jest for unit and integration tests (`supertest` against the Express app), separate configs for `test:unit` and `test:integration`

# Documentation
* [Development Guide](https://github.com/nheyek/heirloom.shop/wiki/Development-Guide)
* [Infrastructure](https://github.com/nheyek/heirloom.shop/wiki/Infrastructure)
* [CI/CD](https://github.com/nheyek/heirloom.shop/wiki/CI-CD)
* [Integrations](https://github.com/nheyek/heirloom.shop/wiki/Integrations)
