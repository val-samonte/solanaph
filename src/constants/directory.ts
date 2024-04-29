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
  | 'website'

export const projectTagsArray = [
  '🎖️ member-project',
  'aggregator',
  'agnostic',
  'airdrops',
  'ai-ml',
  'amm',
  'analytics',
  'art',
  'bridge',
  'bot',
  'cex',
  'dao',
  'defi',
  'depin',
  'devnet',
  'dex',
  'explorer',
  'farming',
  'games',
  'identity',
  'insurance',
  'launchpad',
  'lending',
  'marketplace',
  'nft',
  'oracle',
  'prediction',
  'rpc',
  'social',
  'staking',
  'storage',
  'utility',
  'wallet',
] as const

export type ProjectTags = (typeof projectTagsArray)[number]

export interface Project {
  name: string
  image?: string
  url: string
  links: {
    type: ProjectLinkType
    url: string
  }[]
  tags: ProjectTags[]
  memberProject?: boolean
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
    tags: ['🎖️ member-project', 'dao', 'social', 'nft'],
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
    tags: ['🎖️ member-project', 'games', 'nft', 'devnet'],
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
    tags: ['🎖️ member-project', 'defi', 'analytics'],
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
    tags: ['🎖️ member-project', 'airdrops', 'farming', 'agnostic'],
  },
  {
    name: 'Pet Legends',
    image: 'petlegends.jpg',
    url: 'https://petlegends.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/pet_legends',
      },
      {
        type: 'linktree',
        url: 'https://linktr.ee/petlegends',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/NbTu5FmQUN',
      },
      {
        type: 'telegram',
        url: 'https://t.me/pet_legends',
      },
    ],
    tags: ['🎖️ member-project', 'games', 'nft'],
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
    tags: ['🎖️ member-project', 'utility'],
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
    tags: ['🎖️ member-project', 'games', 'nft', 'devnet'],
  },
  {
    name: 'Airdrop Checker',
    image: 'airdropchecker.webp',
    url: 'https://www.airdropped.link/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/solworks_',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/Qbd7yNcEPS',
      },
    ],
    tags: ['airdrops', 'utility'],
  },
  {
    name: 'Armada',
    image: 'armada.jpg',
    url: 'https://app.armadafi.so/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/ArmadaFi',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/TSBBdfZMhq',
      },
      {
        type: 'docs',
        url: 'https://docs.armadafi.so/',
      },
      {
        type: 'blog',
        url: 'https://blog.armadafi.so/',
      },
    ],
    tags: ['staking', 'farming'],
  },

  {
    name: 'Aurory',
    image: 'aurory.jpg',
    url: 'https://app.aurory.io/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/AuroryProject',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/aurory-project-836601552130801676',
      },
      {
        type: 'telegram',
        url: 'https://t.me/aurory_project',
      },
    ],
    tags: ['games', 'nft'],
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
    name: 'Backpack Exchange',
    image: 'backpack.jpg',
    url: 'https://backpack.exchange/',
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
        type: 'telegram',
        url: 'https://t.me/BackpackExchangeSupport',
      },
      {
        type: 'docs',
        url: 'https://support.backpack.exchange/en/categories/305537-backpack-exchange',
      },
    ],
    tags: ['cex'],
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
    tags: ['defi', 'agnostic', 'aggregator', 'analytics', 'utility'],
  },
  {
    name: 'Bonk Rewards',
    image: 'https://bonkrewards.com/assets/bonkrewards-logo-lcp3OaC8.png',
    url: 'https://bonkrewards.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/ArmadaFi',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/TSBBdfZMhq',
      },
    ],
    tags: ['staking', 'farming'],
  },
  {
    name: 'Code',
    image: 'code.jpg',
    url: 'https://getcode.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/getcode',
      },
      {
        type: 'docs',
        url: 'https://code-payments.github.io/code-sdk/docs/guide/introduction.html',
      },
    ],
    tags: ['wallet', 'utility'],
  },
  {
    name: 'deBridge',
    image: 'debridge.png',
    url: 'https://app.debridge.finance/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/deBridgeFinance',
      },
      {
        type: 'docs',
        url: 'https://docs.debridge.finance/',
      },
      {
        type: 'telegram',
        url: 'https://t.me/deBridge_finance',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/debridge',
      },
      {
        type: 'github',
        url: 'https://github.com/debridge-finance/',
      },
    ],
    tags: ['bridge', 'agnostic'],
  },

  {
    name: 'DFlow',
    image: 'dflow.jpg',
    url: 'https://dflow.net/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/DFlowProtocol',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/dflow',
      },
      {
        type: 'blog',
        url: 'https://dflow.net/en/blog',
      },
      {
        type: 'docs',
        url: 'https://docs.dflow.net/docs/introduction',
      },
    ],
    tags: ['defi', 'dex'],
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
    name: 'Exchange Art',
    image: 'exchangeart.jpg',
    url: 'https://exchange.art/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/exchgART',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/exchangeart',
      },
    ],
    tags: ['nft', 'marketplace', 'art'],
  },
  {
    name: 'FluxBeam',
    image: 'fluxbeam.jpg',
    url: 'https://fluxbeam.xyz/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/FluxBeamDEX',
      },
      {
        type: 'telegram',
        url: 'https://t.me/fluxbeam_bot',
      },
    ],
    tags: ['defi', 'dex', 'bot', 'utility'],
  },
  {
    name: 'Grass',
    image: 'grass.jpg',
    url: 'https://www.getgrass.io/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/getgrass_io',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/getgrass',
      },
      {
        type: 'docs',
        url: 'https://docs.getgrass.io/',
      },
      {
        type: 'blog',
        url: 'https://www.getgrass.io/blog',
      },
    ],
    tags: ['ai-ml', 'depin', 'farming'],
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
    name: 'Kamino',
    image: 'kamino.jpg',
    url: 'https://app.kamino.finance/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/KaminoFinance',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/kaminofinance',
      },
      {
        type: 'docs',
        url: 'https://docs.kamino.finance/',
      },
    ],
    tags: ['defi', 'dex', 'staking', 'lending'],
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
    name: 'mallow.',
    image: 'mallow.jpg',
    url: 'https://www.mallow.art/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/mallow__art',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/mallowart',
      },
    ],
    tags: ['nft', 'marketplace', 'art'],
  },
  {
    name: 'marginfi',
    image: 'marginfi.jpg',
    url: 'https://app.marginfi.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/marginfi',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/mrgn',
      },
      {
        type: 'docs',
        url: 'https://docs.marginfi.com/',
      },
      {
        type: 'github',
        url: 'https://github.com/mrgnlabs',
      },
    ],
    tags: ['defi', 'dex', 'staking', 'lending'],
  },
  {
    name: 'Meteora',
    image: 'meteora.jpg',
    url: 'https://app.meteora.ag/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/MeteoraAG',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/bbNxzYbucn',
      },
      {
        type: 'docs',
        url: 'https://docs.meteora.ag/',
      },
      {
        type: 'blog',
        url: 'https://meteoraag.medium.com/',
      },
    ],
    tags: ['defi', 'staking', 'farming'],
  },
  {
    name: 'Nyan Heroes',
    image: 'nyanheroes.png',
    url: 'https://nyanheroes.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/nyanheroes',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/nyanheroesgame',
      },
      {
        type: 'telegram',
        url: 'https://t.me/nyanheroes',
      },
      {
        type: 'linktree',
        url: 'https://linktr.ee/nyanheroes',
      },
    ],
    tags: ['games', 'nft'],
  },
  {
    name: 'Orca',
    image: 'orca.jpg',
    url: 'https://www.orca.so/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/orca_so',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/rdrW577act',
      },
      {
        type: 'blog',
        url: 'https://medium.com/orca-so',
      },
      {
        type: 'docs',
        url: 'https://docs.orca.so/',
      },
      {
        type: 'community',
        url: 'https://forums.orca.so/',
      },
      {
        type: 'linktree',
        url: 'https://linktr.ee/orca_so',
      },
    ],
    tags: ['defi', 'amm', 'staking', 'farming'],
  },
  {
    name: 'Parcl',
    image: 'parcl.jpg',
    url: 'https://app.parcl.co/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/Parcl',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/parcl',
      },
    ],
    tags: ['defi', 'marketplace'],
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
    name: 'Photo Finish™ LIVE',
    image: 'photofinish.png',
    url: 'https://photofinish.live/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/photofinishgame',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/AsEMTAnJaS',
      },
      {
        type: 'linktree',
        url: 'https://linktr.ee/photofinishlive',
      },
    ],
    tags: ['games', 'nft'],
  },
  {
    name: 'Portal Bridge',
    image: 'portalbridge.png',
    url: 'https://portalbridge.com/',
    links: [
      {
        type: 'docs',
        url: 'https://portalbridge.com/docs/',
      },
      {
        type: 'github',
        url: 'https://github.com/XLabs/portal-bridge-ui',
      },
    ],
    tags: ['bridge', 'agnostic'],
  },
  {
    name: 'Pyth Network',
    image: 'pythnetwork.jpg',
    url: 'https://pyth.network/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/PythNetwork',
      },
      {
        type: 'linktree',
        url: 'https://linktr.ee/pythnetwork',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/pythnetwork',
      },
      {
        type: 'telegram',
        url: 'https://t.me/Pyth_Network',
      },
    ],
    tags: ['oracle', 'agnostic', 'analytics'],
  },
  {
    name: 'Realms',
    image: 'realms.jpg',
    url: 'https://realms.today/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/Realms_DAOs',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/VsPbrK2hJk',
      },
      {
        type: 'github',
        url: 'https://github.com/solana-labs/governance-ui',
      },
    ],
    tags: ['dao', 'utility', 'social'],
  },
  {
    name: 'Rugcheck',
    image: 'rugcheck.jpg',
    url: 'https://rugcheck.xyz/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/Rugcheckxyz',
      },
    ],
    tags: ['utility'],
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
    tags: ['defi', 'dex', 'staking'],
  },
  {
    name: 'ShdwDrive',
    image: 'https://portal.shdwdrive.com/img/shadow-logo-svg.svg',
    url: 'https://portal.shdwdrive.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/genesysgo',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/genesysgo',
      },
      {
        type: 'telegram',
        url: 'https://t.me/shadowdriveecosystem',
      },
      {
        type: 'docs',
        url: 'https://docs.shdwdrive.com/',
      },
      {
        type: 'github',
        url: 'https://github.com/GenesysGo/',
      },
    ],
    tags: ['storage', 'depin', 'utility'],
  },
  {
    name: 'SideShift.ai',
    image: 'sideshiftai.jpg',
    url: 'https://sideshift.ai/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/sideshiftai',
      },
      {
        type: 'telegram',
        url: 'https://t.me/sideshift',
      },
    ],
    tags: ['cex', 'agnostic'],
  },
  {
    name: 'Sol-Incinerator',
    image: 'solincinerator.jpg',
    url: 'https://sol-incinerator.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/solincinerator',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/solslugs',
      },
    ],
    tags: ['utility', 'nft'],
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
    tags: ['defi', 'staking', 'lending', 'analytics', 'airdrops', 'dao'],
  },
  {
    name: 'Solarplex',
    image: 'solarplex.jpg',
    url: 'https://www.solarplex.xyz/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/solarplex_xyz',
      },
    ],
    tags: ['social'],
  },
  {
    name: 'Solcasino.io',
    image: 'solcasinoio.jpg',
    url: 'https://solcasino.io/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/solcasinoio',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/solcasinoio',
      },
      {
        type: 'telegram',
        url: 'https://t.me/SolcasinoIOBot',
      },
      {
        type: 'blog',
        url: 'https://medium.com/@Solcasinoio',
      },
    ],
    tags: ['games', 'nft'],
  },
  {
    name: 'SolChat',
    image: 'solchat.jpg',
    url: 'https://www.solchat.app/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/SolChatCoin',
      },
      {
        type: 'telegram',
        url: 'https://t.me/SolChatCoin',
      },
      {
        type: 'website',
        url: 'https://www.solchat.io/',
      },
    ],
    tags: ['social'],
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
    name: 'Sollinked',
    image: 'sollinked.jpg',
    url: 'https://sollinked.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/Sollinked_com',
      },
    ],
    tags: ['social'],
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
    tags: ['defi', 'utility', 'analytics', 'agnostic'],
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
    tags: ['dao', 'social', 'staking', 'utility'],
  },
  {
    name: 'Star Atlas',
    image: 'staratlas.jpg',
    url: 'https://play.staratlas.com/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/staratlas',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/staratlas',
      },
    ],
    tags: ['games', 'nft'],
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
    tags: ['defi', 'utility', 'analytics'],
  },
  {
    name: 'Switchboard',
    image: 'switchboard.jpg',
    url: 'https://app.switchboard.xyz/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/switchboardxyz',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/switchboardxyz',
      },
      {
        type: 'blog',
        url: 'https://switchboardxyz.medium.com/',
      },
      {
        type: 'github',
        url: 'https://github.com/switchboard-xyz',
      },
    ],
    tags: ['oracle', 'analytics', 'agnostic'],
  },
  {
    name: 'TipLink',
    image: 'tiplink.jpg',
    url: 'https://tiplink.io/',
    links: [
      {
        type: 'x',
        url: 'https://twitter.com/TipLinkOfficial',
      },
      {
        type: 'discord',
        url: 'https://discord.com/invite/tQxNatVuQT',
      },
      {
        type: 'docs',
        url: 'https://docs.tiplink.io/',
      },
    ],
    tags: ['wallet', 'utility'],
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

  // {
  //   name: '',
  //   image: '',
  //   url: '',
  //   links: [],
  //   tags: [],
  // },
]

// NEED HELP!
// If you are a member of Solana PH community, please submit PRs so that
// we can correct some of the information and
// add more known projects used by the community.

// todo:
// teleport, helium, hive mapper,

// todo rpc:
// helius, quicknode, triton, hellomoon

// todo identity:
// civic, matrica

// metaplex
