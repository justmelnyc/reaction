import { mount } from "enzyme"
import "jest-styled-components"
import renderer from "react-test-renderer"
import React from "react"
import { FollowButton } from "../Button"

describe("FollowButton", () => {
  const getWrapper = props => {
    return mount(<FollowButton {...props} />)
  }

  let props = {
    handleFollow: jest.fn(),
    isFollowed: false,
  }

  describe("snapshots", () => {
    it("Renders FollowButton properly", () => {
      const component = renderer.create(<FollowButton {...props} />).toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    beforeEach(() => {
      props = {
        handleFollow: jest.fn(),
        isFollowed: false,
      }
    })

    describe("CTA text", () => {
      it("Reads 'follow' if isFollowed is false", () => {
        const component = getWrapper(props)
        expect(component.text()).toMatch("Follow")
      })

      it("Reads 'Following' if props.isFollowed", () => {
        props.isFollowed = true
        const component = getWrapper(props)
        expect(component.text()).toMatch("Following")
      })

      it("Reads 'Unfollow' if props.isFollowed and state.showUnfollow", () => {
        props.isFollowed = true
        const component = getWrapper(props)
        component.setState({ showUnfollow: true })
        expect(component.text()).toMatch("Unfollow")
      })
    })

    it("Calls props.handleFollow onClick", () => {
      const component = getWrapper(props)
      component.simulate("click")
      expect(props.handleFollow).toBeCalled()
    })

    it("Sets state.showUnfollow on onMouseEnter", () => {
      const component = getWrapper(props)
      component.simulate("mouseEnter")
      expect(component.state().showUnfollow).toBe(true)
    })

    it("Sets state.showUnfollow on onMouseLeave", () => {
      const component = getWrapper(props)
      component.setState({ showUnfollow: true })
      component.simulate("mouseLeave")
      expect(component.state().showUnfollow).toBeFalsy()
    })
  })
})
