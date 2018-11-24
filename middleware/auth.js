export default function({ store, redirect, route }) {
  if (!store.state.parsedToken.username && route.path !== '/login') {
    // If the user is not authenticated
    return redirect(`/login?redirect=${encodeURIComponent(route.path)}`)
  } else if (store.state.parsedToken.username && route.path === '/login') {
    // If the user is authenticated and try to opening login page
    return redirect(`/`)
  }
}
