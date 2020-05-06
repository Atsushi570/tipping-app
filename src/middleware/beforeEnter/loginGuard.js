// idTokenがstoreにない場合はログイン画面にリダイレクトする
export default ({ store, redirect }) => {
  if (!store.state.auth.idToken) {
    redirect('/')
  }
}
