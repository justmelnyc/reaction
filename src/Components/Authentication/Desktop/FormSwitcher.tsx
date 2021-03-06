import React from "react"
import Events from "Utils/Events"
import { track } from "Utils/track"
import {
  FormComponentType,
  InputValues,
  ModalOptions,
  ModalType,
  SubmitHandler,
} from "../Types"
import { LoginForm } from "./LoginForm"
import { ResetPasswordForm } from "./ResetPasswordForm"
import { SignUpForm } from "./SignUpForm"

export interface FormSwitcherProps {
  handleSubmit: SubmitHandler
  options?: ModalOptions
  tracking?: any
  type: ModalType
  values?: InputValues
  error?: string
  onFacebookLogin?: (e: Event) => void
  onTwitterLogin?: (e: Event) => void
}

export interface State {
  type?: ModalType
}

@track({}, { dispatch: data => Events.postEvent(data) })
export class FormSwitcher extends React.Component<FormSwitcherProps, State> {
  static defaultProps: Partial<FormSwitcherProps> = {
    values: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
    }
  }

  componentDidMount() {
    const {
      options: {
        contextModule,
        copy,
        destination,
        redirectTo,
        intent,
        trigger,
        triggerSeconds,
      },
      type,
      tracking,
    } = this.props

    // Analytics
    const event = Object.assign(
      {
        action: "Auth impression",
        type,
        context_module: contextModule,
        modal_copy: copy,
        trigger: trigger || "click",
        trigger_seconds: triggerSeconds,
        intent,
        auth_redirect: redirectTo || destination,
      },
      type === "signup"
        ? {
            onboarding: !redirectTo,
          }
        : null
    )
    if (tracking) {
      tracking.trackEvent(event)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type && nextProps.type) {
      this.setState({
        type: nextProps.type,
      })
    }
  }

  presentModal = (newType: ModalType) => {
    this.setState({ type: newType })
  }

  render() {
    const { error, onFacebookLogin, onTwitterLogin } = this.props

    let Form: FormComponentType
    switch (this.state.type) {
      case ModalType.login:
        Form = LoginForm
        break
      case ModalType.signup:
        Form = SignUpForm
        break
      case ModalType.resetPassword:
        Form = ResetPasswordForm
        break
      default:
        return null
    }

    const { values } = this.props
    const defaultValues = {
      email: values.email || "",
      password: values.password || "",
      name: values.name || "",
      acceptedTermsOfService: values.acceptedTermsOfService || false,
    }

    return (
      <Form
        error={error}
        values={defaultValues}
        handleTypeChange={this.presentModal}
        handleSubmit={this.props.handleSubmit}
        onFacebookLogin={onFacebookLogin}
        onTwitterLogin={onTwitterLogin}
      />
    )
  }
}
