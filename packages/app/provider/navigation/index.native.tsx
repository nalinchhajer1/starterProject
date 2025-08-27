import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { PDDarkTheme, PDLightTheme } from 'ui/src/theme'
import { useMemo, useCallback } from 'react'
import { useColorScheme } from 'react-native'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const scheme = useColorScheme()
  
  const onReadyCallback = useCallback(() => {
  }, [])
  
  return (
    <NavigationContainer
      onReady={onReadyCallback}
      theme={scheme === 'dark' ? PDDarkTheme : PDLightTheme}
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'Tab',
            screens: {
              Tab: '',
              // Add your screen routing here when needed
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
