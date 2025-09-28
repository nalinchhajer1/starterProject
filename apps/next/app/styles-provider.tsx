'use client';
import { useServerInsertedHTML } from 'next/navigation';
import { StyleSheet } from 'react-native';
import { Provider } from 'app/src/Provider';

export function StylesProvider({ children }: { children: React.ReactNode }) {
    useServerInsertedHTML(() => {
        // @ts-ignore
        const sheet = StyleSheet.getSheet();
        return <style dangerouslySetInnerHTML={{ __html: sheet.textContent }} id={sheet.id} />;
    });

    return <Provider loading={<div>Loading...</div>}>{children}</Provider>;
}
