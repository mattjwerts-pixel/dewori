/**
 * One-time setup script — generates a Shopify Storefront API access token
 * from your Dev Dashboard app's Client ID and Client Secret.
 *
 * Usage:
 *   node scripts/get-storefront-token.mjs <client_id> <client_secret>
 *
 * It will print the token to paste into .env.local.
 */

const STORE = '0z91ps-ba.myshopify.com'
const clientId = process.argv[2]
const clientSecret = process.argv[3]

if (!clientId || !clientSecret) {
  console.error('Usage: node scripts/get-storefront-token.mjs <client_id> <client_secret>')
  process.exit(1)
}

console.log(`\nConnecting to ${STORE} ...\n`)

// ── Step 1: Exchange Client ID + Secret for an Admin API access token ─────
// New Dev Dashboard apps use the OAuth client_credentials grant.
const tokenRes = await fetch(`https://${STORE}/admin/oauth/access_token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  }),
})

const tokenData = await tokenRes.json()

if (!tokenData.access_token) {
  // Some Dev Dashboard apps use Basic Auth instead of grant_type
  console.log('client_credentials grant did not work, trying Basic Auth ...\n')

  const basicRes = await fetch(
    `https://${STORE}/admin/api/2025-01/storefront_access_tokens.json`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storefront_access_token: { title: 'Dewori Skin Next.js Frontend' },
      }),
    }
  )

  const basicData = await basicRes.json()

  if (basicData.storefront_access_token?.access_token) {
    printSuccess(basicData.storefront_access_token.access_token)
    process.exit(0)
  }

  console.error('❌ Both methods failed. Raw responses:')
  console.error('\nOAuth attempt:', JSON.stringify(tokenData, null, 2))
  console.error('\nBasic Auth attempt:', JSON.stringify(basicData, null, 2))
  console.error('\nPlease paste the above output so we can diagnose the issue.')
  process.exit(1)
}

console.log('✓ Got Admin API token\n')

// ── Step 2: Create a Storefront API access token via Admin API ─────────────
const sfRes = await fetch(
  `https://${STORE}/admin/api/2025-01/storefront_access_tokens.json`,
  {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': tokenData.access_token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      storefront_access_token: { title: 'Dewori Skin Next.js Frontend' },
    }),
  }
)

const sfData = await sfRes.json()

if (!sfData.storefront_access_token?.access_token) {
  console.error('❌ Could not create Storefront API token:')
  console.error(JSON.stringify(sfData, null, 2))
  process.exit(1)
}

printSuccess(sfData.storefront_access_token.access_token)

function printSuccess(token) {
  console.log('✅ Success!\n')
  console.log('Add this line to your .env.local:\n')
  console.log(`SHOPIFY_STOREFRONT_ACCESS_TOKEN=${token}\n`)
}
