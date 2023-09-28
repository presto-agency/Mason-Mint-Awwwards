import { FC, memo, useCallback } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

import toast, { Toaster } from 'react-hot-toast'
import { useCopyToClipboard } from 'usehooks-ts'
import { ProductProps } from '@/utils/types'

const AnimatedElement = dynamic(
  () => import('@/ui/AnimatedElement/AnimatedElement')
)

import LinkIcon from 'public/icons/link.svg'
import Facebook from 'public/icons/facebook.svg'
import Twitter from 'public/icons/twitter.svg'
import Linkedin from 'public/icons/linkedin.svg'

import styles from './ShareCoins.module.scss'

type ShareCoinsProps = {
  className?: string
  product?: ProductProps
}

const ShareCoins: FC<ShareCoinsProps> = ({ className }) => {
  const { asPath } = useRouter()
  const [_, copy] = useCopyToClipboard()
  const sharedUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`

  const handleCopy = useCallback(() => {
    copy(sharedUrl).then(() => {
      toast.success('Link copied!')
    })
  }, [sharedUrl, copy])

  return (
    <div className={classNames(styles['ShareCoins'], className)}>
      <Toaster position="bottom-right" />
      <AnimatedElement>
        <h6>share coins</h6>
      </AnimatedElement>
      <AnimatedElement className={styles['linksList']}>
        <LinkIcon className={styles['icon']} onClick={handleCopy} />
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${sharedUrl}`}
        >
          <Facebook className={styles['icon']} />
        </Link>
        <Link
          href={`https://twitter.com/intent/tweet?url=${sharedUrl}&via=twitterhandle`}
        >
          <Twitter className={styles['icon']} />
        </Link>
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${sharedUrl}`}
        >
          <Linkedin className={styles['icon']} />
        </Link>
      </AnimatedElement>
    </div>
  )
}

export default memo(ShareCoins)
