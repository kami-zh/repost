import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

export const OnlyUser = UserAuthWrapper({
  authSelector: (state) => state.currentUser,
  failureRedirectPath: '/sign_in',
  predicate: (currentUser) => currentUser.signedIn,
  redirectAction: routerActions.replace
})

export const OnlyGuest = UserAuthWrapper({
  authSelector: (state) => state.currentUser,
  failureRedirectPath: '/',
  predicate: (currentUser) => !currentUser.signedIn,
  redirectAction: routerActions.replace
})

export const OnlyAdmin = UserAuthWrapper({
  authSelector: (state) => state.currentUser,
  failureRedirectPath: '/',
  predicate: (currentUser) => currentUser.role == 'admin',
  redirectAction: routerActions.replace
})
