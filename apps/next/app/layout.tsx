import { StylesProvider } from './styles-provider';
import './globals.css';

export const metadata = {
    title: 'Starter Project',
    description: 'Starter Project'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <StylesProvider>{children}</StylesProvider>
            </body>
        </html>
    );
}
