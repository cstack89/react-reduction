const AuthConfiguration = {
  client_id: 'react_spa',
  redirect_uri: 'https://smarthome.fledglingmaker.com/cards/callback',
  response_type: 'code',
  post_logout_redirect_uri: 'https://smarthome.fledglingmaker.com',
  scope: 'openid profile email api',
  authority: 'https://smarthome.fledglingmaker.com/auth/realms/master',
  silent_redirect_uri: 'https://smarthome.fledglingmaker.com/silent_callback',
  automaticSilentRenew: true,
  loadUserInfo: true,
  triggerAuthFlow: true,
};

export default AuthConfiguration;