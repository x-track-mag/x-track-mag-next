# X-TRACK MAG WEBSITE

## How to setup

### 1. Clone the repo

```sh
git clone git@github.com:x-track-mag/x-track-mag-next.git
cd x-track-mag-next
```

Install the dependencies :

```sh
yarn
```

### 2. Set up the environment variables

[Get the applications keys for Prismic or Contentful](), then copy the required application key and js api key inside `env.local`

```sh
cp .env.local.prismic .env.local
nano .env.local
```

which should now contain something like this with the values of your backend :

```properties
PRISMIC_API_ENDPOINT=https://x-track-mag.cdn.prismic.io/api/v2
PRISMIC_ACCESS_TOKEN=XXXXX
PRISMIC_CLIENT_ID=XXXXX
PRISMIC_CLIENT_SECRET=XXXXXXX
```

## Troubleshooting

### `Warning: Prop className did not match.`
