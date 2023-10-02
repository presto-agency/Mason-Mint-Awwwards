import useWindowDimensions from '@/hooks/useWindowDimensions'
import CustomCursor from '@/ui/CustomCursor/CustomCursor'
import { useRouter } from 'next/router'
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useWindowSize } from 'usehooks-ts'

type ActionType = 'default' | 'drag' | 'arrow' | 'disappear'

type CursorLayoutContextType = {
  actionType?: ActionType
  setActionType?: Dispatch<SetStateAction<ActionType>>
}

const CursorLayoutContext = createContext<CursorLayoutContextType>({})

type CursorLayoutProps = {
  children: ReactNode
}

export const useCursor = () => {
  const { actionType, setActionType } = useContext(
    CursorLayoutContext
  ) as CursorLayoutContextType
  return { actionType, setActionType }
}

const CursorLayout: FC<CursorLayoutProps> = ({ children }) => {
  const [actionType, setActionType] = useState<ActionType>('default')
  const router = useRouter()
  const { width } = useWindowSize()
  const value = useMemo(() => {
    return {
      actionType,
      setActionType,
    }
  }, [actionType, setActionType])

  useEffect(() => {
    const handleRouteChange = () => {
      setActionType('default')
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    if (width < 991) {
      setActionType('disappear')
    } else {
      setActionType('default')
    }
  }, [width])

  return (
    <CursorLayoutContext.Provider value={value}>
      <CustomCursor actionType={actionType} setActionType={setActionType} />
      {children}
    </CursorLayoutContext.Provider>
  )
}

export default CursorLayout
