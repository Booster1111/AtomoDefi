import React from 'react'
import { Link as RebassLink } from 'rebass'
import RouterLink from 'next/link'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten, darken } from 'polished'

const WrappedLink = ({ external, children, ...rest }) => (
  <RebassLink
    target={external ? '_blank' : null}
    rel={external ? 'noopener noreferrer' : null}
    color="#2f80ed"
    {...rest}
  >
    {children}
  </RebassLink>
)

WrappedLink.propTypes = {
  external: PropTypes.bool
}

const Link = styled(WrappedLink)`
  color: ${({ color, theme }) => (color ? color : theme.link)};
`

export default Link

export const CustomLinkStyle = styled.a`
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: ${({ color, theme }) => (color ? color : theme.link)};

  &:visited {
    color: ${({ color, theme }) => (color ? lighten(0.1, color) : lighten(0.1, theme.link))};
  }

  &:hover {
    cursor: pointer;
    text-decoration: none;
    underline: none;
    color: ${({ color, theme }) => (color ? darken(0.1, color) : darken(0.1, theme.link))};
  }
`

export const CustomLink = ({ href, children, style }) => {
  // Must add passHref to Link
  return (
    <RouterLink href={href} passHref>
      <CustomLinkStyle style={style}>{children}</CustomLinkStyle>
    </RouterLink>
  )
}

export const BasicLinkStyle = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
    text-decoration: none;
    underline: none;
  }
`

export const BasicLink = ({ href, children }) =>
  <RouterLink href={href} passHref>
    <BasicLinkStyle>{children}</BasicLinkStyle>
  </RouterLink>
