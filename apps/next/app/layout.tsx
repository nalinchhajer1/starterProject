import { StylesProvider } from './styles-provider'
import './globals.css'

export const metadata = {
  title: 'Padmodaya Jain Calendar',
  description: 'Jain Calendar with Tithi, Events and Utilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StylesProvider>{children}</StylesProvider>
      </body>
    </html>
  )
}
