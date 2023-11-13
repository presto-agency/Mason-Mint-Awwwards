import { FC } from 'react'
import dynamic from 'next/dynamic'
import CustomMintingProcess from '@/modules/CustomMinting/ui/CustomMintingProcess/CustomMintingProcess'

const CustomMintingMarketing = dynamic(
  () =>
    import(
      '@/modules/CustomMinting/ui/CustomMintingMarketing/CustomMintingMarketing'
    ),
  { ssr: false }
)

const BecomeDistributorSection = dynamic(
  () =>
    import('@/components/BecomeDistributorSection/BecomeDistributorSection'),
  { ssr: false }
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
