import { BrowserRouter } from "react-router-dom"

class DebugRouter extends BrowserRouter {
  constructor(props) {
    super(props)
    // eslint-disable-next-line no-console
    console.log("initial history is: ", JSON.stringify(this.history, null, 2))
    this.history.listen((location, action) => {
      // eslint-disable-next-line no-console
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      // eslint-disable-next-line no-console
      console.log(
        `The last navigation action was ${action}`,
        JSON.stringify(this.history, null, 2)
      )
    })
  }
}

export default DebugRouter
