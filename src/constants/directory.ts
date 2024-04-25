export type ProjectLinkType =
  | 'telegram'
  | 'discord'
  | 'x'
  | 'twitter'
  | 'facebook'
  | 'xnft'
  | 'github'
  | 'linktree'
  | 'docs'
  | 'community'
  | 'blog'

export const projectTagsArray = [
  'games',
  'nft',
  'marketplace',
  'defi',
  'dex',
  'art',
  'utility',
  'wallet',
  'explorer',
  'dao',
  'bridge',
  'oracle',
  'analytics',
  'lending',
  'staking',
  'launchpad',
  'crosschain',
  'identity',
  'social',
  'prediction',
  'insurance',
  'aggregator',
  'airdrops',
  'farming',
  'rpc',
  'depin',
] as const

export type ProjectTags = (typeof projectTagsArray)[number]

interface Project {
  name: string
  image?: string
  url: string
  links: {
    type: ProjectLinkType
    url: string
  }[]
  tags: ProjectTags[]
}

export const directory: Project[] = [
  {
    name: 'Armada DAO',
    image: 'https://www.thearmadadao.xyz/logo.png',
    url: 'https://www.thearmadadao.xyz/',
    links: [
      {
        type: 'twitter',
        url: 'https://twitter.com/TheArmadaDAO',
      },
    ],
    tags: ['dao', 'social', 'nft'],
  },
  {
    name: 'Backpack',
    image: 'backpack.jpg',
    url: 'https://backpack.app/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/Backpack',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/backpack',
      },
      {
        type: 'github',
        url: 'https://github.com/coral-xyz/backpack',
      },
    ],
    tags: ['wallet', 'staking'],
  },
  {
    name: 'Birdeye',
    url: 'https://birdeye.so/?chain=solana',
    image: 'birdeye.jpg',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/birdeye_so',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/7GVRPNynuU',
      },
      {
        type: 'telegram',
        url: 'https://t.me/birdeye_official',
      },
      {
        type: 'docs',
        url: 'https://docs.birdeye.so/',
      },
      {
        type: 'blog',
        url: 'https://medium.com/birdeye-so',
      },
    ],
    tags: ['defi', 'dex', 'crosschain', 'aggregator'],
  },
  {
    name: 'DeezQuest Beta',
    image: 'deezquest.png',
    url: 'https://deezquest.vercel.app/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/deezquest',
      },
      {
        type: 'xnft',
        url: 'https://www.xnft.gg/app/J15EFLZCaUNaVN57Yvp4JjU6mGi3M3m24jgR6Vm46aLd',
      },
    ],
    tags: ['games', 'nft'],
  },
  {
    name: 'Drift',
    image: 'https://app.drift.trade/assets/icons/driftIcon.svg',
    url: 'https://app.drift.trade/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/DriftProtocol',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/driftprotocol',
      },
    ],
    tags: ['defi', 'dex', 'lending', 'staking'],
  },
  {
    name: 'Drip',
    image: 'https://drip.haus/drip_logo_white.a87ccb99.svg',
    url: 'https://drip.haus/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/drip_haus',
      },
      {
        type: 'linktree',
        url: 'https://linktr.ee/drip.haus',
      },
    ],
    tags: ['art', 'marketplace', 'nft'],
  },
  {
    name: 'Hawksight',
    image: 'https://www.hawksight.co/logo192.png',
    url: 'https://www.hawksight.co/',
    links: [
      {
        type: 'twitter',
        url: 'https://twitter.com/hawksightco',
      },
      {
        type: 'discord',
        url: 'https://discord.gg/hawksight',
      },
      {
        type: 'docs',
        url: 'https://hawksight.gitbook.io/whitepaper',
      },
    ],
    tags: ['defi', 'analytics'],
  },
  {
    name: 'Jupiter',
    url: 'https://jup.ag/swap',
    image: 'jupiter.jpg',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/JupiterExchange',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/jup',
      },
      {
        type: 'blog',
        url: 'https://station.jup.ag/blog/',
      },
    ],
    tags: ['defi', 'dex', 'aggregator'],
  },
  {
    name: 'Magic Eden',
    url: 'https://magiceden.io/solana',
    image: 'magiceden.jpg',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/MagicEden',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/magiceden',
      },
      {
        type: 'community',
        url: 'https://community.magiceden.io/',
      },
    ],
    tags: ['nft', 'marketplace', 'art'],
  },
  {
    name: 'Paldo.io',
    image: 'paldoio.png',
    url: 'https://paldo.io/',
    links: [
      {
        type: 'telegram',
        url: 'https://t.me/paldo_io',
      },
    ],
    tags: ['airdrops', 'farming'],
  },
  {
    name: 'Phantom',
    image: 'phantom.jpg',
    url: 'https://phantom.app/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/phantom',
      },
      {
        type: 'docs',
        url: 'https://help.phantom.app/hc/en-us',
      },
    ],
    tags: ['wallet', 'staking'],
  },
  {
    name: 'Sanctum',
    url: 'https://app.sanctum.so/trade',
    image: 'sanctum.jpg',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/sanctumso',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/sanctumso',
      },
      {
        type: 'docs',
        url: 'https://learn.sanctum.so/guides',
      },
    ],
    tags: ['defi', 'dex', 'aggregator', 'staking'],
  },
  {
    name: 'SolanaFM',
    image: 'solanafm.jpg',
    url: 'https://solana.fm/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/solanafm',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/K9VNGyQgZc',
      },
    ],
    tags: ['explorer'],
  },
  {
    name: 'SolanaHub',
    image: 'solanahub.webp',
    url: 'https://solanahub.app/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/SolanaHubApp',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/YTTVV5qaKp',
      },
      {
        type: 'docs',
        url: 'https://docs.solanahub.app/',
      },
      {
        type: 'blog',
        url: 'https://blog.solanahub.app/',
      },
    ],
    tags: [
      'defi',
      'dex',
      'aggregator',
      'staking',
      'lending',
      'analytics',
      'airdrops',
      'dao',
    ],
  },
  {
    name: 'Solflare',
    image: 'solflare.jpg',
    url: 'https://solflare.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/solflare_wallet',
      },
    ],
    tags: ['wallet', 'staking'],
  },
  {
    name: 'Solscan',
    image: 'solscan.webp',
    url: 'https://solscan.io/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/solscanofficial',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/vhq8N4hMvA',
      },
    ],
    tags: ['explorer'],
  },
  {
    name: 'SonarWatch',
    url: 'https://sonar.watch/',
    image: 'sonarwatch.jpg',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/Sonarwatch',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/gG4DvM2JGw',
      },
      {
        type: 'docs',
        url: 'https://docs.sonar.watch/',
      },
    ],
    tags: ['defi', 'utility', 'analytics', 'aggregator'],
  },
  {
    name: 'Splitr Tool',
    url: 'https://splitr-tool.vercel.app/',
    links: [
      {
        type: 'github',
        url: 'https://github.com/val-samonte/splitr',
      },
    ],
    tags: ['utility'],
  },
  {
    name: 'Squads',
    image: 'squads.jpg',
    url: 'https://v3.squads.so/squads',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/SquadsProtocol',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/Qwhew4M4RS',
      },
      {
        type: 'docs',
        url: 'https://docs.squads.so/squads-v3-docs',
      },
      {
        type: 'github',
        url: 'https://github.com/Squads-Protocol/squads-mpl',
      },
    ],
    tags: ['dao', 'social', 'staking'],
  },
  {
    name: 'Step',
    image: 'https://app.step.finance/favicon.ico',
    url: 'https://app.step.finance/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/StepFinance_',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/Pab8wcH5Yt',
      },
    ],
    tags: ['defi', 'utility', 'analytics', 'aggregator'],
  },
  {
    name: 'Tensor',
    url: 'https://www.tensor.trade/',
    image: 'tensor.jpg',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/tensor_hq',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/tensor',
      },
    ],
    tags: ['nft', 'marketplace', 'art'],
  },
  {
    name: 'Xray',
    image: 'helius.jpg',
    url: 'https://xray.helius.xyz/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/heliuslabs',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/nSkq35VUf5',
      },
      {
        type: 'github',
        url: 'https://github.com/helius-labs/xray',
      },
    ],
    tags: ['explorer'],
  },
  {
    name: 'Zed Wars Beta',
    image: 'https://beta.zedwars.com/logo.webp',
    url: 'https://beta.zedwars.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/ZedWarsSOL',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/zedwars',
      },
    ],
    tags: ['games', 'nft'],
  },
]

// todo: bridges, oracles
// wormhole portal, shadow storage, realms.today, mallow, exchange art, bonkrewards.com
// star atlas, aurory,
