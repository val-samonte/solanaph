'use client'

import { useMemo } from 'react'
import list from '../../deidentified_members.json'
import { useWallet } from '@solana/wallet-adapter-react'
import { FancyButton } from '@/components/FancyButton'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import cn from 'classnames'
import { ImageLoader } from '@/components/ImageLoader'

// 800m total supply

const sum = list.reduce((total, entry) => {
  return total + 1 + entry.tags.length
}, 0)

export default function Og() {
  const wallet = useWallet()
  const { setVisible } = useWalletModal()

  const record = useMemo(() => {
    if (!wallet?.publicKey) return null
    const address = wallet.publicKey.toBase58()
    return list.find((i) => i.address === address) ?? null
  }, [wallet])

  const share = record ? ((record.tags.length + 1) / sum) * 500 : 0

  return (
    <div className='flex flex-col relative items-center justify-center h-full min-h-screen'>
      <div className='w-full overflow-x-hidden overflow-y-auto'>
        <div className='w-full max-w-7xl mx-auto flex flex-col gap-5 p-5 items-center'>
          <h1 className='my-3 text-2xl'>OG Token Allocation</h1>
          {wallet?.publicKey ? (
            <>
              <p className='text-center'>
                Connected wallet:
                <br />
                <span className='font-bold break-all'>
                  {wallet.publicKey.toBase58()}
                </span>
              </p>
              <ImageLoader
                src={`https://shdw-drive.genesysgo.net/EQUAMGwdZNwhuZxXVFeVmxVYd3ZWMhL1TYFoM1WScLgQ/${wallet.publicKey.toBase58()}_message.png`}
              >
                {!record ? (
                  <p>You are not eligible for the airdrop</p>
                ) : (
                  <>
                    {record.tags.length > 0 && (
                      <>
                        <p>You have accumulated the following points:</p>
                        <div className='w-full max-w-sm flex flex-col'>
                          {record.tags.map((tag, i) => (
                            <div
                              key={i}
                              className={cn(
                                'flex items-center px-4 py-2',
                                i % 2 === 0 ? 'bg-black/20' : 'bg-white/5'
                              )}
                            >
                              <span className='flex-auto'>{tag}</span>
                              <span>1 point</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <p className='text-center my-3 text-xl w-full max-w-sm'>
                      Your share is around{' '}
                      <span className='font-bold text-green-400'>
                        ~{share.toFixed(4)} USD
                      </span>{' '}
                      worth of tokens. Congrats!
                    </p>
                  </>
                )}
              </ImageLoader>
              <div className='max-w-sm'>
                <FancyButton
                  onClick={() => {
                    wallet.disconnect()
                  }}
                >
                  Disconnect
                </FancyButton>
              </div>
            </>
          ) : (
            <>
              <p>
                Connect your wallet to check your eligibility for the Solana
                Philippines DAO Token Airdrop
              </p>
              <div className='max-w-sm'>
                <FancyButton
                  onClick={() => {
                    setVisible(true)
                  }}
                >
                  Connect
                </FancyButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
