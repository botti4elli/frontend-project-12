import { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ChevronDown } from 'react-bootstrap-icons'

const MessagesWrapper = ({ children, scrollToBottomTrigger }) => {
  const wrapperRef = useRef(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const skipScrollEvent = useRef(false)

  useEffect(() => {
    const container = wrapperRef.current
    if (!container) return

    skipScrollEvent.current = true
    container.scrollTo({ top: container.scrollHeight })
    setShowScrollButton(false)
  }, [scrollToBottomTrigger])

  const handleScroll = () => {
    const container = wrapperRef.current
    if (!container) return

    if (skipScrollEvent.current) {
      skipScrollEvent.current = false
      return
    }

    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10
    setShowScrollButton(!isAtBottom)
  }

  const handleScrollToBottom = () => {
    const container = wrapperRef.current
    if (!container) return

    skipScrollEvent.current = true
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    setShowScrollButton(false)
  }

  return (
    <div className="position-relative h-100 d-flex" style={{ minHeight: 0 }}>
      <div
        ref={wrapperRef}
        className="overflow-auto flex-grow-1"
        onScroll={handleScroll}
        style={{
          minHeight: 0,
          paddingBottom: '2rem',
        }}
      >
        {children}
      </div>

      {showScrollButton && (
        <div
          className="position-absolute"
          style={{
            bottom: '1.5rem',
            right: '-2.5rem',
            zIndex: 10,
          }}
        >
          <Button
            variant="light"
            size="sm"
            className="border shadow-sm bg-white bg-opacity-75"
            onClick={handleScrollToBottom}
            aria-label="Scroll to bottom"
            style={{ transition: 'opacity 0.2s ease-in-out' }}
          >
            <ChevronDown />
          </Button>
        </div>
      )}
    </div>
  )
}

export default MessagesWrapper
