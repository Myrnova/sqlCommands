import { AnimatePresence, motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

import * as S from './styles'

export type ReadMoreType = {
  children: React.ReactNode
  isToggle?: boolean
  isOpenButton?: string
  isClosedButton?: string
}

const ReadMore = ({
  children,
  isToggle = false,
  isOpenButton = 'Ler menos',
  isClosedButton = 'Ler mais'
}: ReadMoreType) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isToShowOpenCloseButton, setIsToShowOpenCloseButton] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const contentHeight = contentRef.current
      ? contentRef.current.clientHeight
      : 0
    const wrapperHeight = wrapperRef.current
      ? wrapperRef.current.clientHeight
      : 0
    if (contentHeight <= wrapperHeight + 5) {
      setIsOpen(true)
      setIsToShowOpenCloseButton(false)
    }
  }, [])

  const contentVariant = {
    open: { height: 'auto' },
    collapsed: { overflow: 'hidden' }
  }

  return (
    <AnimatePresence>
      <S.Wrapper
        as={motion.section}
        key="content"
        initial="collapsed"
        animate={isOpen ? 'open' : 'collapsed'}
        variants={contentVariant}
        transition={{ duration: 0.5 }}
        ref={wrapperRef}
      >
        <S.Content
          isShowingCloseButton={
            isToShowOpenCloseButton && isToggle && isOpen ? true : false
          }
          ref={contentRef}
        >
          {children}
        </S.Content>

        {isToShowOpenCloseButton && !isOpen && !isToggle && (
          <S.ShowText onClick={() => setIsOpen(!isOpen)}>
            {isClosedButton}
          </S.ShowText>
        )}
        {isToShowOpenCloseButton && isToggle && (
          <S.ShowText onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? isOpenButton : isClosedButton}
          </S.ShowText>
        )}
      </S.Wrapper>
    </AnimatePresence>
  )
}

export default ReadMore