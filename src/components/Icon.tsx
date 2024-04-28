import { ProjectLinkType } from '@/constants/directory'
import {
  DiscordLogo,
  FacebookLogo,
  GithubLogo,
  Link,
  LinktreeLogo,
  Notebook,
  ReadCvLogo,
  TelegramLogo,
  UsersFour,
  XLogo,
} from '@phosphor-icons/react'

interface IIcon {
  icon: ProjectLinkType
}

const Icon = ({ icon }: IIcon) => {
  switch (icon) {
    case 'telegram':
      return <TelegramLogo size={18} />
    case 'discord':
      return <DiscordLogo size={18} />
    case 'x':
      return <XLogo size={18} />
    case 'twitter':
      return <XLogo size={18} />
    case 'facebook':
      return <FacebookLogo size={18} />
    case 'github':
      return <GithubLogo size={18} />
    case 'linktree':
      return <LinktreeLogo size={18} />
    case 'docs':
      return <Notebook size={18} />
    case 'community':
      return <UsersFour size={18} />
    case 'blog':
      return <ReadCvLogo size={18} />
    case 'xnft':
    default:
      return <Link size={18} />
  }
}

export default Icon
