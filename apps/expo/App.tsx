import React, { useEffect } from 'react'
import { Provider } from 'app/provider'
import { RootStackScreen } from 'navigation/src/navigators'

export default function App() {
  return (
    <Provider>
      <RootStackScreen />
    </Provider>
  )
}
