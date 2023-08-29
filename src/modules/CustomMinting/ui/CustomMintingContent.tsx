import { FC } from 'react'
import dynamic from 'next/dynamic'
import HeroInner from '@/ui/HeroInner/HeroInner'
import CustomMintingBanner from '@/modules/CustomMinting/ui/CustomMintingBanner/CustomMintingBanner'
import CustomMintingMoment from '@/modules/CustomMinting/ui/CustomMintingMoment/CustomMintingMoment'
import Container from '@/app/layouts/Container'
import CustomMintingMarketing from '@/modules/CustomMinting/ui/CustomMintingMarketing/CustomMintingMarketing'
const CustomMintingProcess = dynamic(
  () =>
    import(
      '@/modules/CustomMinting/ui/CustomMintingProcess/CustomMintingProcess'
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
      <HeroInner
        title="Let Us Make Your Vision a Reality"
        subtitle="Custom Minting"
      />
      <CustomMintingBanner />
      <Container>
        <CustomMintingMoment
          className={styles['CustomMintingContent__moment']}
        />
      </Container>
      <CustomMintingProcess />
      <Container>
        <CustomMintingMarketing
          className={styles['CustomMintingContent__marketing']}
        />
      </Container>
      <BecomeDistributorSection
        className={styles['CustomMintingContent__becomeADistributor']}
      />
    </main>
  )
}
