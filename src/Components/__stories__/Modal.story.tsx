import { storiesOf } from "@storybook/react"
import React from "react"

import Button from "../Buttons/Default"
import Modal from "../Modal/Modal"
import ModalHeader from "../ModalHeader"
import Title from "../Title"

const ModalStyle = {
  height: "500px",
  width: "500px",
}

class ModalDemo extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render(): JSX.Element {
    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          style={ModalStyle}
          show={this.state.isModalOpen}
          onClose={this.closeModal}
        >
          <ModalHeader>
            <Title>This is a modal title</Title>
          </ModalHeader>
          <div>
            <p>This is modal contents</p>
            <hr />
            <div>Even more contents</div>
          </div>
        </Modal>
      </div>
    )
  }
}

storiesOf("Components/Modal/Demo", module).add("ModalDemo", () => <ModalDemo />)
