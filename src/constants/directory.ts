export type ProjectLinkType =
  | 'telegram'
  | 'discord'
  | 'x'
  | 'twitter'
  | 'facebook'
  | 'xnft'
  | 'github'
  | 'linktree'

export const projectTagsArray = [
  'game',
  'nft',
  'marketplace',
  'defi',
  'dex',
  'art',
  'utility',
  'wallet',
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
    name: 'Paldo.io',
    image: 'paldoio.png',
    url: 'https://paldo.io/',
    links: [{ type: 'telegram', url: 'https://t.me/paldo_io' }],
    tags: [],
  },
  {
    name: 'Drift',
    image: 'https://app.drift.trade/assets/icons/driftIcon.svg',
    url: 'https://app.drift.trade/',
    links: [
      { type: 'x', url: 'https://twitter.com/DriftProtocol' },
      { type: 'discord', url: 'https://discord.com/invite/driftprotocol' },
    ],
    tags: ['defi', 'dex'],
  },
  {
    name: 'Drip',
    image: 'https://drip.haus/drip_logo_white.a87ccb99.svg',
    url: 'https://drip.haus/',
    links: [
      { type: 'x', url: 'https://twitter.com/drip_haus' },
      { type: 'linktree', url: 'https://linktr.ee/drip.haus' },
    ],
    tags: ['art', 'marketplace', 'nft'],
  },
  {
    name: 'Step',
    image: 'https://app.step.finance/favicon.ico',
    url: 'https://app.step.finance/',
    links: [
      { type: 'x', url: 'https://twitter.com/StepFinance_' },
      { type: 'discord', url: 'https://discord.com/invite/Pab8wcH5Yt' },
    ],
    tags: ['defi', 'utility'],
  },
  {
    name: 'Zed Wars Beta',
    image: 'https://beta.zedwars.com/logo.webp',
    url: 'https://beta.zedwars.com/',
    links: [
      { type: 'x', url: 'https://twitter.com/ZedWarsSOL' },
      { type: 'discord', url: 'https://discord.com/invite/zedwars' },
    ],
    tags: ['game', 'nft'],
  },
  {
    name: 'DeezQuest Beta',
    image: 'deezquest.png',
    url: 'https://deezquest.vercel.app/',
    links: [
      { type: 'x', url: 'https://twitter.com/deezquest' },
      {
        type: 'xnft',
        url: 'https://www.xnft.gg/app/J15EFLZCaUNaVN57Yvp4JjU6mGi3M3m24jgR6Vm46aLd',
      },
    ],
    tags: ['game', 'nft'],
  },
  {
    name: 'Splitr Tool',
    url: 'https://splitr-tool.vercel.app/',
    links: [{ type: 'github', url: 'https://github.com/val-samonte/splitr' }],
    tags: ['utility'],
  },
]
