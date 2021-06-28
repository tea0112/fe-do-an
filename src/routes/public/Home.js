import { Redirect } from "react-router-dom"
import React from "react"

function Home({ authentication }) {
  const isAdmin = () => {
    if (!authentication.isLoading && authentication.isLoaded) {
      if (authentication.isAuthenticated) {
        if (authentication.account.user.admin) {
          return <Redirect to="/admin" />
        }
        return <Redirect to="/sinh-vien" />
      }
      return <Redirect to="/login" />
    }
    return null
  }
  return <>{isAdmin()}</>
}

export default Home
