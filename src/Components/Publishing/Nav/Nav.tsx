import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { PartnerInline } from "../Partner/PartnerInline"
import { SubNav } from "./SubNav"

interface Props {
  transparent?: boolean
  sponsor?: any
  title?: string
}

interface DivProps {
  transparent: boolean
}

export const Nav: React.SFC<Props> = props => {
  const {
    sponsor,
    transparent,
    title
  } = props
  return (
    <NavContainer transparent={transparent}>
      <PartnerInline
        url={sponsor && sponsor.url}
        logo={sponsor && sponsor.partner_light_logo}
        color="white"
        margin="0 10px"
      />
      <Title>
        {title}
      </Title>
      <SubNav />
    </NavContainer>
  )
}

Nav.defaultProps = {
  transparent: false,
  title: "Artsy Editorial"
}

const Div: StyledFunction<DivProps & React.HTMLProps<HTMLDivElement>> = styled.div
const NavContainer = Div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  width: 100%;
  background-color: ${props => props.transparent ? "transparent" : "black"};
  color: white;
`
const Title = styled.div`
  ${Fonts.garamond("s17")}
  position: absolute;
  width: 100%;
  text-align: center;
  ${pMedia.sm`
    position: relative;
  `}
`