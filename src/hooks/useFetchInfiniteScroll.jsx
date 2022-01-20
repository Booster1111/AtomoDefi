import React, { useState, useEffect } from 'react'
import { ChevronsUp } from 'react-feather'
import { Button } from 'rebass'
import { useRouter } from 'next/router'
import { NFT_COLLECTIONS_API } from 'constants'

export default function useFetchInfiniteScroll({
  list = [],
  cursor = null,
  numInView = 25,
  filters = [],
  setFetchedData,
  setCursor,
}) {
  const { asPath } = useRouter()
  const path = asPath.split('/').slice(2).join('/') ?? ''

  const [dataLength, setDatalength] = useState(numInView)
  const [hasMore, setHasMore] = useState(true)
  const [displayScrollToTopButton, setDisplayScrollToTopButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setDisplayScrollToTopButton(true)
      } else {
        setDisplayScrollToTopButton(false)
      }
    })
  }, [])

  // Reset when category changes or else might be limited if one category is smaller than the other
  const stringifyFilters = JSON.stringify(filters)
  useEffect(() => {
    setHasMore(true)
    setDatalength(numInView)
  }, [stringifyFilters, numInView])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const next = async () => {
    const { PK, SK, totalVolumeUSD, category } = list.slice(-1)[0]

    const nextCursor = cursor
      ? encodeURIComponent(JSON.stringify(cursor))
      : encodeURIComponent(
          JSON.stringify({
            PK,
            SK,
            totalVolumeUSD,
            category,
          })
        )

    const url = `${NFT_COLLECTIONS_API}${path ? `/${path}` : ''}?cursor=${nextCursor}`

    const { data, cursor: newCursor } = await fetch(url).then((r) => r.json())

    setFetchedData(list.concat(data))
    setCursor(newCursor)

    if (!newCursor) {
      setDatalength(list.length)
      setHasMore(false)
    } else {
      setDatalength(dataLength + numInView)
    }
  }

  const LoadMoreButton = (
    <Button
      displayScrollToTopButton={displayScrollToTopButton}
      onClick={handleScrollToTop}
      sx={{
        borderRadius: '50%',
        padding: 0,
        color: 'inherit',
        width: 36,
        height: 36,
        position: 'fixed',
        zIndex: 1,
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '2rem',
        opacity: 0.2,
        cursor: 'Pointer',
        display: displayScrollToTopButton ? 'inline' : 'none',
      }}
    >
      <ChevronsUp />
    </Button>
  )

  return {
    dataLength,
    hasMore,
    LoadMoreButton,
    next,
  }
}
