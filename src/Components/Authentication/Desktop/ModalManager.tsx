import { handleSubmit as defaultHandleSubmit } from "Components/Authentication/helpers"
import {
  InputValues,
  ModalOptions,
  ModalType,
  SubmitHandler,
} from "Components/Authentication/Types"
import { FormikProps } from "formik"
import React, { Component } from "react"
import { DesktopModal } from "./Components/DesktopModal"
import { FormSwitcher } from "./FormSwitcher"

export interface ModalManagerProps {
  submitUrls?: { [P in ModalType]: string } & {
    facebook?: string
    twitter?: string
  }
  csrf?: string
  redirectTo?: string
  tracking?: any
  type?: ModalType
  handleSubmit?: (
    type: ModalType,
    options: ModalOptions,
    values: InputValues,
    formikBag: FormikProps<InputValues>
  ) => void
}

export interface ModalManagerState {
  currentType?: ModalType
  options?: ModalOptions
  error?: string
}

export class ModalManager extends Component<
  ModalManagerProps,
  ModalManagerState
> {
  state: ModalManagerState = {
    currentType: null,
    options: {
      copy: null,
      redirectTo: "/",
    },
  }

  openModal = (options: ModalOptions) => {
    const { mode } = options

    this.setState({
      currentType: mode,
      options,
    })

    document.body.style.overflowY = "hidden"
  }

  closeModal = () => {
    this.setState({
      currentType: null,
    })
    document.body.style.overflowY = "auto"
  }

  setError = err => this.setState({ error: err })

  render() {
    const { csrf, submitUrls, redirectTo } = this.props
    const { currentType, options, error } = this.state

    const handleSubmit: SubmitHandler = !!this.props.handleSubmit
      ? this.props.handleSubmit.bind(this, currentType, options)
      : defaultHandleSubmit(submitUrls[currentType], csrf, redirectTo)

    return (
      <DesktopModal
        show={!!currentType}
        onTypeChange={this.openModal}
        onClose={this.closeModal}
        subtitle={options.copy}
      >
        <FormSwitcher
          type={currentType}
          error={error}
          handleSubmit={handleSubmit}
          onFacebookLogin={() =>
            (window.location.href =
              submitUrls.facebook + "?redirect-to=" + redirectTo)
          }
          onTwitterLogin={() =>
            (window.location.href =
              submitUrls.twitter + "?redirect-to=" + redirectTo)
          }
          options={options}
        />
      </DesktopModal>
    )
  }
}
