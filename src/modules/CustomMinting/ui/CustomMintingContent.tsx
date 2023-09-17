import { FC } from 'react'
import dynamic from 'next/dynamic'
const CustomMintingProcess = dynamic(
  () =>
    import(
      '@/modules/CustomMinting/ui/CustomMintingProcess/CustomMintingProcess'
    ),
  { ssr: false }
)

const CustomMintingMarketing = dynamic(
  () =>
    import(
      '@/modules/CustomMinting/ui/CustomMintingMarketing/CustomMintingMarketing'
    ),
  { ssr: false }
)

const BecomeDistributorSection = dynamic(
  () => import('@/components/BecomeDistributorSection/BecomeDistributorSection')
)

import styles from './CustomMintingContent.module.scss'

export const CustomMintingContent: FC = () => {
  return (
    <main className={styles['CustomMintingContent']}>
      <CustomMintingProcess className={styles['proccess']} />
      <CustomMintingMarketing />
      <BecomeDistributorSection />
    </main>
  )
}
