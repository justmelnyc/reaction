import { FormikProps } from "formik"

export enum ModalType {
  login = "login",
  signup = "signup",
  resetPassword = "reset_password",
}

export interface InputValues {
  name?: string
  email?: string
  password?: string
  acceptedTermsOfService?: boolean
}

export type SubmitHandler = (
  values: InputValues,
  formikBag: FormikProps<InputValues>
) => void

export interface FormProps {
  /**
   * any global error that comes from an external data source
   * (e.g. server)
   */
  error?: string
  values?: InputValues
  handleSubmit?: SubmitHandler
  handleTypeChange?: (modalType: ModalType) => void
  onFacebookLogin?: (e: Event) => void
  onTwitterLogin?: (e: Event) => void
}

export interface ModalOptions {
  /**
   * the free string copy of the modal that was triggered.
   */
  copy?: string
  /**
   * the type of modal to display.
   */
  mode?: ModalType
  /**
   * the page path the user is redirected to after successfully
   * login or account creation after onboarding.
   */
  destination?: string
  /**
   * the page path the user is redirected to after successfully
   * login or account creation (skips onboarding).
   */
  redirectTo?: string
  /**
   * the action taken that prompted user to signup or login.
   */
  intent?: string
  /**
   * the page before the page on which the sign up was triggered.
   */
  signupReferer?: string
  /**
   * defines an action to take after the user successfully signs up
   *
   * @example
   * {
   *   action: 'save',
   *   objectId: artwork.id
   * }
   */
  afterSignUpAction?: string
  /*
   * the location where the modal was triggered.
   */
  contextModule?: string
  /**
   * the type of action that triggered the modal (eg: click, timed)
   */
  trigger?: string
  /**
   * the number of seconds before a modal was triggered
   */
  triggerSeconds?: number
}

export type FormComponentType = React.SFC<FormProps>
