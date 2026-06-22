import { ShopifyProduct, ShopifyCart } from '@/types/shopify';

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiUrl = `https://${domain}/api/2024-01/graphql.json`;

// ---------------------------------------------------------------------------
// Core fetcher — all Shopify API calls go through here
// ---------------------------------------------------------------------------
async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
    // Revalidate product data every 60 seconds on Vercel
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${json.errors[0].message}`);
  }

  return json.data as T;
}

// ---------------------------------------------------------------------------
// GraphQL fragments reused across queries
// ---------------------------------------------------------------------------
const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    tags
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// getProducts — fetch all products from the store
// ---------------------------------------------------------------------------
export async function getProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
    query: `
      ${PRODUCT_FRAGMENT}
      query GetProducts {
        products(first: 50, sortKey: CREATED_AT, reverse: true) {
          edges {
            node {
              ...ProductFragment
            }
          }
        }
      }
    `,
  });

  return data.products.edges.map((edge) => edge.node);
}

// ---------------------------------------------------------------------------
// getProduct — fetch a single product by its URL handle
// ---------------------------------------------------------------------------
export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>({
    query: `
      ${PRODUCT_FRAGMENT}
      query GetProduct($handle: String!) {
        productByHandle(handle: $handle) {
          ...ProductFragment
        }
      }
    `,
    variables: { handle },
  });

  return data.productByHandle;
}

// ---------------------------------------------------------------------------
// createCart — create a new empty Shopify cart
// ---------------------------------------------------------------------------
export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: `
      ${CART_FRAGMENT}
      mutation CartCreate {
        cartCreate {
          cart {
            ...CartFragment
          }
        }
      }
    `,
  });

  return data.cartCreate.cart;
}

// ---------------------------------------------------------------------------
// addToCart — add a variant to an existing cart (creates lines)
// ---------------------------------------------------------------------------
export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: `
      ${CART_FRAGMENT}
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFragment
          }
        }
      }
    `,
    variables: { cartId, lines },
  });

  return data.cartLinesAdd.cart;
}

// ---------------------------------------------------------------------------
// updateCartLine — change the quantity of a line already in the cart
// ---------------------------------------------------------------------------
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: `
      ${CART_FRAGMENT}
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFragment
          }
        }
      }
    `,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  });

  return data.cartLinesUpdate.cart;
}

// ---------------------------------------------------------------------------
// removeFromCart — remove a line from the cart entirely
// ---------------------------------------------------------------------------
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: `
      ${CART_FRAGMENT}
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFragment
          }
        }
      }
    `,
    variables: { cartId, lineIds },
  });

  return data.cartLinesRemove.cart;
}

// ---------------------------------------------------------------------------
// getCart — retrieve a cart by its ID
// ---------------------------------------------------------------------------
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: `
      ${CART_FRAGMENT}
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFragment
        }
      }
    `,
    variables: { cartId },
  });

  return data.cart;
}
