export default function({ store, redirect, route }) {
  if (!store.state.me && route.path !== '/login') {
    // If the user is not authenticated
    console.log(route)
    console.log('user not set and want to go' + route.path)
    return redirect(`/login?redirect=${encodeURIComponent(route.path)}`)
  } else if (store.state.me && route.path === '/login') {
    // If the user is authenticated and try to opening login page
    console.log('user set and want to go' + route.path)
    return redirect(`/`)
  }
}
