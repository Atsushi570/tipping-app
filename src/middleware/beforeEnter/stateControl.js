export default ({ route, store, redirect }) => {
  const localIdToken = localStorage.getItem('idToken')

  if (store.state.auth.idToken) {
    // storeにidTokenがある場合はどのページをリクエストされてもdashboardページを表示する
    if (route.path !== '/dashboard') redirect('/dashboard')

    // storeにidTokenが存在しないがlocalstrageにidTokenが存在する場合、自動ログインを実施する
  } else if (localIdToken) {
    store.commit('auth/updateDisplayName', localStorage.getItem('displayName'))
    store.dispatch('auth/autoLogin').then(() => {
      if (route.path !== '/dashboard') redirect('/dashboard')
    })
  }

  // storeにもlocalstrageにもidTokenが存在しない場合にdashboardページをリクエストされたらloginページにリダイレクトする
  else if (route.path === '/dashboard') redirect('/')
}
