# Dev icons

These are the self-hosted copies of the 27 technology icons used by project badges
and the code demo. Both components use `frontend/src/images/devIcons.ts` to load
them from `https://assets.michael-iwanek-portfolio.com/icons/dev/v1/`.

The existing private media bucket (`portfolio-media-<account>-us-west-1`) stores
them under `icons/dev/v1/`, and the existing CloudFront distribution serves them.
The deployment workflow uploads these checked-in files before publishing the
frontend in both static and ECS hosting modes. No icon downloads are needed
during builds or at runtime.

Sources:

- 25 SVGs from [Devicon v2.17.0](https://github.com/devicons/devicon/tree/v2.17.0/icons).
  The MIT license is preserved in `LICENSE.devicon`. Brand trademarks remain
  their respective owners' property.
- `c/C_Logo.png` preserves the previously used
  [Wikimedia C logo](https://commons.wikimedia.org/wiki/File:C_Logo.png).
- `openssl/openssl_logo.svg` is the existing repository's OpenSSL logo, moved
  from the project badge component directory.

The previous Devicon `@latest` jsDelivr URLs returned HTTP 403 because the
upstream package exceeded jsDelivr's 50 MB size limit. Keeping the actual files
here and in S3 removes that runtime dependency.

The `v1` objects use a one-year immutable cache. For replacements, add a new
version directory, update the shared URL and deployment upload path together,
and keep previous versions available for older frontend releases.
