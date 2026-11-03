/**
 * Job I-8: Instinct phrase table for iris-alexa regression tests.
 * 20 lines must match check_scam; 50 must stay no_known_pattern under check_scam.
 */

export interface InstinctScamPhrase {
  id: string;
  line: string;
  pattern: string;
  source: string;
}

export interface InstinctCleanPhrase {
  id: string;
  line: string;
  source: string;
}

/** Instinct table: must flag (20). Each row cites where the phrase came from. */
export const INSTINCT_MUST_FLAG: InstinctScamPhrase[] = [
  {
    id: "I8-S01",
    pattern: "seed_phrase_request",
    source: "Instinct phrase table — Trezor support impersonation (quoted in SEAL-adjacent corpus)",
    line: "Automated reply: to better understand & look into your issue please reply with the 24 word phrase you were given when you setup your broken Trezor device. This data is not accessible by humans & is used to check the firmware version of your device.",
  },
  {
    id: "I8-S02",
    pattern: "seed_phrase_request",
    source: "Instinct phrase table — recovery phrase on a verification page",
    line: "Visit our official verification page. Enter your recovery phrase following the on-screen instructions. If your current phrase is compromised, you will receive instructions on how to generate a new recovery phrase.",
  },
  {
    id: "I8-S03",
    pattern: "seed_phrase_request",
    source: "Instinct phrase table — suspend unverified wallet + confirm recovery phrase",
    line: "Our system shows some irregular activities in your wallet which requires immediate verification of ownership, to secure your wallet verification can be done via the page below. Due to new updates on NFTs, unverified wallets will be suspended. within 24hours of receiving this alert. CONFIRM RECOVERY PHRASE [link]",
  },
  {
    id: "I8-S04",
    pattern: "fake_airdrop",
    source: "Instinct phrase table — Solana Foundation airdrop lure",
    line: "Claim Your SOL Airdrop Now! Congratulations! You're eligible for the SOL airdrop! You've been chosen to receive an exclusive SOL reward from the Solana Foundation! Claim your reward now before it expires! [link]",
  },
  {
    id: "I8-S05",
    pattern: "fake_airdrop",
    source: "Instinct phrase table — large allocation claim countdown",
    line: "YOUR $450M LAYER3 AIRDROP ALLOCATION IS READY TO CLAIM!! LAYER3 FOUNDATION private wealth distribution $450,000,000 Allocation exclusively reserved for [redacted]. claim window closes in 07 days 18 hours 42 minutes 36 seconds [link]",
  },
  {
    id: "I8-S06",
    pattern: "fake_airdrop",
    source: "Instinct phrase table — TrustWallet form airdrop",
    line: "TrustWallet is airdropping a total of 10,000,000,000 TWT coins to new and existing Trustwallet users. Kindly fill in the Google forms below to participate. [link]",
  },
  {
    id: "I8-S07",
    pattern: "urgent_verify_wallet_link",
    source: "Instinct phrase table — MetaMask unverified suspension notice",
    line: "Dear customer, Our system has shown that your Metamask has not yet been verified. This verification can be done easily on the page below. Due to the new update of NFT's & Coins, all unverified accounts will be suspended on Monday, October 28, 2024. VERIFY MY WALLET [link]",
  },
  {
    id: "I8-S08",
    pattern: "urgent_verify_wallet_link",
    source: "Instinct phrase table — main wallet verify within 48 hours",
    line: "Our system has shown that your main wallet has not yet been verified by us, this verification can be done easily via the button below. All unverified accounts will be suspended within 48 hours. Verify Your Wallet [link]",
  },
  {
    id: "I8-S09",
    pattern: "urgent_verify_wallet_link",
    source: "Instinct phrase table — authorize wallet or suspend capabilities",
    line: "Important: Failure to authorize your wallet by May 15, 2026 will result in temporary suspension of transaction capabilities until verification is completed. [Authorize Wallet Now] [link]",
  },
  {
    id: "I8-S10",
    pattern: "fake_support_dm",
    source: "Instinct phrase table — bridge support asks which wallet",
    line: "Use debridge, what wallet are you using? [redacted]",
  },
  {
    id: "I8-S11",
    pattern: "fake_support_dm",
    source: "Instinct phrase table — Dapp Connect + connect wallet to proceed",
    line: "To make a transfer, click on Dapp Connect and connect your wallet to proceed with the transfer.",
  },
  {
    id: "I8-S12",
    pattern: "validate_or_sync_wallet",
    source: "Know Your Crook — https://paragraph.com/@knowyourcrook/scam-review-validate-your-wallet",
    line: "[link] 1. Click on the digital web link above 2. Click on get started 3. Click on synchronize wallet 4. Select the wallet you're using from the wallet list 5. Get your wallet connected.",
  },
  {
    id: "I8-S13",
    pattern: "fake_support_dm",
    source: "r/cardano — https://www.reddit.com/r/cardano/comments/rd9cjr/",
    line: "Reconnecting your wallet via dapps What wallet are you using?",
  },
  {
    id: "I8-S14",
    pattern: "validate_or_sync_wallet",
    source: "r/CryptoCurrency — https://www.reddit.com/r/CryptoCurrency/comments/qw4rga/",
    line: "Hello Had the same issue some week ago Have you tried rectificating your wallet on their website",
  },
  {
    id: "I8-S15",
    pattern: "unlimited_approval",
    source: "Instinct phrase table — unlimited USDC approval for swap",
    line: "To finish the swap the dapp needs an unlimited approval on your USDC so you never have to approve again. Click approve and set the spending limit to maximum.",
  },
  {
    id: "I8-S16",
    pattern: "doubling_giveaway",
    source: "Instinct phrase table — send SOL receive double back",
    line: "SOL GIVEAWAY: send 1 SOL to the address below and receive 2 SOL back within minutes. First 500 wallets.",
  },
  {
    id: "I8-S17",
    pattern: "qr_code_connect",
    source: "Instinct phrase table — scan QR with Phantom to claim",
    line: "Scan this QR code with Phantom to claim your free NFT mint pass.",
  },
  {
    id: "I8-S18",
    pattern: "fake_support_dm",
    source: "Instinct phrase table — Solflare support connect to proceed",
    line: "Hello, I am from Solflare support. Connect your wallet to proceed and we will fix the pending transaction.",
  },
  {
    id: "I8-S19",
    pattern: "seed_phrase_request",
    source: "Instinct phrase table — whole-word ask verb (asking)",
    line: "Support is asking for my recovery phrase in chat.",
  },
  {
    id: "I8-S20",
    pattern: "seed_phrase_request",
    source: "Instinct phrase table — whole-word ask verb (needed)",
    line: "The form said it needed my seed phrase to continue.",
  },
];

/** Instinct table: must not flag under check_scam (50). */
export const INSTINCT_MUST_NOT_FLAG: InstinctCleanPhrase[] = [
  { id: "I8-N01", source: "Instinct phrase table — normal airdrop chatter", line: "First airdrop snapshot taken already. Distribution not sent." },
  { id: "I8-N02", source: "Instinct phrase table — normal airdrop chatter", line: "Details for further airdrops not released yet." },
  {
    id: "I8-N03",
    source: "Instinct phrase table — community question",
    line: "When will the Jupiter airdrop happen and how to increase chance of getting higher number of coins?",
  },
  {
    id: "I8-N04",
    source: "Instinct phrase table — security advice",
    line: "Depends on how you are storing your seed phrase and how mindful you are when approving transactions",
  },
  {
    id: "I8-N05",
    source: "Instinct phrase table — golden rule reminder",
    line: "Never share your seed phrase or private key with anyone, that's the golden rule!",
  },
  {
    id: "I8-N06",
    source: "Instinct phrase table — learning safety",
    line: "Im fairly new to crypto and i dont want to fall victim to it so im trying to learn how to keep myself safe",
  },
  {
    id: "I8-N07",
    source: "Instinct phrase table — DM warning",
    line: "Never click the link, especially on X and telegram dm, where it offers airdrop or something like that.",
  },
  {
    id: "I8-N08",
    source: "Instinct phrase table — wallet app error question",
    line: 'Hey guys my trust app keeps saying "Invalid Account For Fee", anyone know what might cause this? Any help is appreciated.',
  },
  { id: "I8-N09", source: "Instinct phrase table — general help", line: "What is going on here? Can someone help me understand?" },
  {
    id: "I8-N10",
    source: "Instinct phrase table — token account question",
    line: "What do you mean by burning the token account ?",
  },
  {
    id: "I8-N11",
    source: "Instinct phrase table — ordinary wallet chat",
    line: "What wallet are you using? I like Phantom for NFTs.",
  },
  {
    id: "I8-N12",
    source: "Instinct phrase table — negated ask (brand safety copy)",
    line: "Phantom will never ask for your recovery phrase",
  },
  {
    id: "I8-N13",
    source: "Instinct phrase table — negated ask",
    line: "I will never ask for your recovery phrase when we troubleshoot together.",
  },
  {
    id: "I8-N14",
    source: "Instinct phrase table — do not share advice",
    line: "Do not share your recovery phrase with anyone who messages you first.",
  },
  {
    id: "I8-N15",
    source: "Instinct phrase table — official docs mention",
    line: "The docs at solana.com explain how transactions are signed.",
  },
  { id: "I8-N16", source: "Instinct phrase table — off-topic", line: "Meeting moved to 3pm, see you at the office." },
  {
    id: "I8-N17",
    source: "Instinct phrase table — personal note",
    line: "I bought a little SOL today, the price went up a bit.",
  },
  {
    id: "I8-N18",
    source: "Instinct phrase table — general tip",
    line: "Tip: check the address bar before you connect your wallet to any site.",
  },
  {
    id: "I8-N19",
    source: "Instinct phrase table — community AMA",
    line: "Our community AMA starts at 18:00 UTC; questions welcome in the thread.",
  },
  {
    id: "I8-N20",
    source: "Instinct phrase table — receipt link benign host",
    line: "Here is the receipt for the coffee order: https://example.com/receipt/123",
  },
  {
    id: "I8-N21",
    source: "Instinct phrase table — Jupiter blog mention",
    line: "The Jupiter team posted the new fee schedule on jup.ag/blog",
  },
  {
    id: "I8-N22",
    source: "Instinct phrase table — hardware wallet question",
    line: "Does Ledger still require blind signing for some Solana programs?",
  },
  {
    id: "I8-N23",
    source: "Instinct phrase table — RPC question",
    line: "Which public RPC endpoint do you use for reading balances?",
  },
  {
    id: "I8-N24",
    source: "Instinct phrase table — NFT chat",
    line: "I minted an NFT yesterday and the metadata looks wrong on the explorer.",
  },
  {
    id: "I8-N25",
    source: "Instinct phrase table — staking question",
    line: "How do I pick a validator for native staking without moving keys off my device?",
  },
  {
    id: "I8-N26",
    source: "Instinct phrase table — transaction history",
    line: "How do I see my transaction history inside Phantom?",
  },
  {
    id: "I8-N27",
    source: "Instinct phrase table — dark mode question",
    line: "Which wallet app has a dark mode?",
  },
  {
    id: "I8-N28",
    source: "Instinct phrase table — block explorer",
    line: "Paste the signature into solscan if you want to read the instruction list.",
  },
  {
    id: "I8-N29",
    source: "Instinct phrase table — token standard",
    line: "What is the difference between SPL token and token-2022 for my project?",
  },
  {
    id: "I8-N30",
    source: "Instinct phrase table — devnet note",
    line: "I am testing on devnet and using a throwaway keypair from solana-keygen.",
  },
  {
    id: "I8-N31",
    source: "Instinct phrase table — password hygiene",
    line: "Use a password manager and turn on two-factor for your email, not your seed phrase.",
  },
  {
    id: "I8-N32",
    source: "Instinct phrase table — bookmark habit",
    line: "Bookmark the exchange login page instead of searching for it each time.",
  },
  {
    id: "I8-N33",
    source: "Instinct phrase table — cold storage mention",
    line: "Cold storage means the signing keys never touch a browser extension.",
  },
  {
    id: "I8-N34",
    source: "Instinct phrase table — multisig intro",
    line: "Our team uses a multisig for treasury moves; no single phone can approve alone.",
  },
  {
    id: "I8-N35",
    source: "Instinct phrase table — fee question",
    line: "Why did this transfer cost more lamports than yesterday?",
  },
  {
    id: "I8-N36",
    source: "Instinct phrase table — slippage settings",
    line: "I raised slippage on the swap UI but still got an error about route not found.",
  },
  {
    id: "I8-N37",
    source: "Instinct phrase table — tax record keeping",
    line: "I export CSV from the exchange for records; I am not asking you to trade for me.",
  },
  {
    id: "I8-N38",
    source: "Instinct phrase table — scam awareness class",
    line: "We run a workshop on spotting impersonation accounts in Discord.",
  },
  {
    id: "I8-N39",
    source: "Instinct phrase table — report phishing",
    line: "If you see a fake site, report it to the wallet team through their in-app form.",
  },
  {
    id: "I8-N40",
    source: "Instinct phrase table — software update",
    line: "Update the wallet app from the store you installed it from, not from a random DM link.",
  },
  {
    id: "I8-N41",
    source: "Instinct phrase table — seed storage metaphor",
    line: "Treat the recovery words like a safe combination, not a password you reset online.",
  },
  {
    id: "I8-N42",
    source: "Instinct phrase table — browser extension hygiene",
    line: "Remove browser extensions you do not recognize before you open a wallet.",
  },
  {
    id: "I8-N43",
    source: "Instinct phrase table — address verification",
    line: "Compare the first and last four characters of the address before you send.",
  },
  {
    id: "I8-N44",
    source: "Instinct phrase table — spoken dot non-domain",
    line: "In the readme they use the word dot between letters when reading a URL aloud.",
  },
  {
    id: "I8-N45",
    source: "Instinct phrase table — podcast note",
    line: "The podcast episode explains how priority fees work on Solana.",
  },
  {
    id: "I8-N46",
    source: "Instinct phrase table — open source",
    line: "The repo is MIT licensed and the issues list is public on GitHub.",
  },
  {
    id: "I8-N47",
    source: "Instinct phrase table — locale settings",
    line: "My wallet shows amounts in euros because I changed display currency in settings.",
  },
  {
    id: "I8-N48",
    source: "Instinct phrase table — hardware failure",
    line: "My phone screen cracked but the seed is still on paper in a drawer.",
  },
  {
    id: "I8-N49",
    source: "Instinct phrase table — friend help",
    line: "A friend helped me set up Phantom by watching the official help videos together.",
  },
  {
    id: "I8-N50",
    source: "Instinct phrase table — revoke approvals reminder",
    line: "Revoke old token approvals you no longer use; that is different from sharing a seed phrase.",
  },
];
