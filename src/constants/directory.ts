export type ProjectLinkType =
  | "telegram"
  | "discord"
  | "x"
  | "twitter"
  | "facebook"
  | "xnft"
  | "github"
  | "linktree"
  | "docs"
  | "community"
  | "blog";

export const projectTagsArray = [
  "games",
  "nft",
  "marketplace",
  "defi",
  "dex",
  "art",
  "utility",
  "dashboard",
  "wallet",
  "explorer",
  "dao",
  "community",
] as const;

export type ProjectTags = (typeof projectTagsArray)[number];

interface Project {
  name: string;
  image?: string;
  url: string;
  links: {
    type: ProjectLinkType;
    url: string;
  }[];
  tags: ProjectTags[];
}

export const directory: Project[] = [
  {
    name: "Paldo.io",
    image: "paldoio.png",
    url: "https://paldo.io/",
    links: [{ type: "telegram", url: "https://t.me/paldo_io" }],
    tags: [],
  },
  {
    name: "Drift",
    image: "https://app.drift.trade/assets/icons/driftIcon.svg",
    url: "https://app.drift.trade/",
    links: [
      { type: "x", url: "https://twitter.com/DriftProtocol" },
      { type: "discord", url: "https://discord.com/invite/driftprotocol" },
    ],
    tags: ["defi", "dex"],
  },
  {
    name: "Drip",
    image: "https://drip.haus/drip_logo_white.a87ccb99.svg",
    url: "https://drip.haus/",
    links: [
      { type: "x", url: "https://twitter.com/drip_haus" },
      { type: "linktree", url: "https://linktr.ee/drip.haus" },
    ],
    tags: ["art", "marketplace", "nft"],
  },
  {
    name: "Step",
    image: "https://app.step.finance/favicon.ico",
    url: "https://app.step.finance/",
    links: [
      { type: "x", url: "https://twitter.com/StepFinance_" },
      { type: "discord", url: "https://discord.com/invite/Pab8wcH5Yt" },
    ],
    tags: ["defi", "utility", "dashboard"],
  },
  {
    name: "Zed Wars Beta",
    image: "https://beta.zedwars.com/logo.webp",
    url: "https://beta.zedwars.com/",
    links: [
      { type: "x", url: "https://twitter.com/ZedWarsSOL" },
      { type: "discord", url: "https://discord.com/invite/zedwars" },
    ],
    tags: ["games", "nft"],
  },
  {
    name: "DeezQuest Beta",
    image: "deezquest.png",
    url: "https://deezquest.vercel.app/",
    links: [
      { type: "x", url: "https://twitter.com/deezquest" },
      {
        type: "xnft",
        url: "https://www.xnft.gg/app/J15EFLZCaUNaVN57Yvp4JjU6mGi3M3m24jgR6Vm46aLd",
      },
    ],
    tags: ["games", "nft"],
  },
  {
    name: "Splitr Tool",
    url: "https://splitr-tool.vercel.app/",
    links: [{ type: "github", url: "https://github.com/val-samonte/splitr" }],
    tags: ["utility"],
  },
  {
    name: "SonarWatch",
    url: "https://sonar.watch/",
    image: "sonarwatch.jpg",
    links: [
      { type: "x", url: "https://twitter.com/Sonarwatch" },
      { type: "discord", url: "https://discord.com/invite/gG4DvM2JGw" },
      { type: "docs", url: "https://docs.sonar.watch/" },
    ],
    tags: ["defi", "utility", "dashboard"],
  },
  {
    name: "Magic Eden",
    url: "https://magiceden.io/solana",
    image: "magiceden.jpg",
    links: [
      {
        type: "x",
        url: "https://twitter.com/MagicEden",
      },
      {
        type: "discord",
        url: "https://discord.com/invite/magiceden",
      },
      {
        type: "community",
        url: "https://community.magiceden.io/",
      },
    ],
    tags: ["nft", "marketplace", "art"],
  },
  {
    name: "Tensor",
    url: "https://www.tensor.trade/",
    image: "tensor.jpg",
    links: [
      {
        type: "x",
        url: "https://twitter.com/tensor_hq",
      },
      { type: "discord", url: "https://discord.com/invite/tensor" },
    ],
    tags: ["nft", "marketplace", "art"],
  },
  {
    name: "Jupiter",
    url: "https://jup.ag/swap",
    image: "jupiter.jpg",
    links: [
      {
        type: "x",
        url: "https://twitter.com/JupiterExchange",
      },
      {
        type: "discord",
        url: "https://discord.com/invite/jup",
      },
      {
        type: "blog",
        url: "https://station.jup.ag/blog/",
      },
    ],
    tags: ["defi", "dex"],
  },
  {
    name: "Birdeye",
    url: "https://birdeye.so/?chain=solana",
    image: "birdeye.jpg",
    links: [
      {
        type: "x",
        url: "https://twitter.com/birdeye_so",
      },
      {
        type: "discord",
        url: "https://discord.com/invite/7GVRPNynuU",
      },
      {
        type: "telegram",
        url: "https://t.me/birdeye_official",
      },
      {
        type: "docs",
        url: "https://docs.birdeye.so/",
      },
      {
        type: "blog",
        url: "https://medium.com/birdeye-so",
      },
    ],
    tags: ["defi", "dex"],
  },
  {
    name: "Hawksight",
    image: "https://www.hawksight.co/logo192.png",
    url: "https://www.hawksight.co/",
    links: [
      { type: "twitter", url: "https://twitter.com/hawksightco" },
      { type: "discord", url: "https://discord.gg/hawksight" },
    ],
    tags: ["defi"],
  },
  {
    name: "Armada DAO",
    image: "https://www.thearmadadao.xyz/logo.png",
    url: "https://www.thearmadadao.xyz/",
    links: [{ type: "twitter", url: "https://twitter.com/TheArmadaDAO" }],
    tags: ["dao"],
  },
];
