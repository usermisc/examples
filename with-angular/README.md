![](../logo.svg)

# Getting started with Polar and Angular

This example demonstrates how to integrate Polar SDK with an Angular application using server-side rendering (SSR).

## Clone the repository

```bash
npx degit polarsource/examples/with-angular ./with-angular
```

## How to use

1. Run the command below to copy the `.env.example` file:

```bash
cp .env.example .env
```

2. Update the `.env` file with your Polar credentials:
   - `POLAR_ACCESS_TOKEN`: Your Polar access token
   - `POLAR_WEBHOOK_SECRET`: Your webhook secret for verifying webhooks
   - `POLAR_MODE`: Set to `sandbox` for testing or `production` for live
   - `POLAR_SUCCESS_URL`: The URL to redirect to after successful checkout

3. Run the command below to install project dependencies:

```bash
npm install
```

4. Build the Angular application:

```bash
npm run build
```

5. Start the server:

```bash
npm run serve:ssr:with-angular
```

The application will be available at `http://localhost:4000`.

## Features

This example includes:

- **Product Listing**: Displays all available Polar products on the home page
- **Checkout Flow**: Direct links to create checkout sessions for each product
- **Customer Portal**: Form to access the customer portal by email
- **Webhook Handler**: POST endpoint at `/polar/webhooks` to verify and process Polar webhooks
- **API Routes**: Server-side Express routes for handling Polar API interactions

## API Routes

- `GET /`: Home page with product listing and customer portal form
- `GET /api/products`: Fetch all non-archived products
- `GET /checkout?products=<product_id>`: Create and redirect to checkout session
- `GET /portal?email=<email>`: Create and redirect to customer portal session
- `POST /polar/webhooks`: Verify and process Polar webhooks

## Development

For development with hot reload:

```bash
npm start
```

This will start the Angular dev server at `http://localhost:4200`.

## Additional Resources

- [Polar Documentation](https://docs.polar.sh)
- [Angular Documentation](https://angular.dev)
- [Angular SSR Guide](https://angular.dev/guide/ssr)
