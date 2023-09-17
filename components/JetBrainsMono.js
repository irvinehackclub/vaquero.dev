import { JetBrains_Mono as JetBrains_MonoFont } from 'next/font/google'

const jetbrainsmono = JetBrains_MonoFont({ subsets: ['latin'] });

export default function JetBrainsMono({ children }) {
    return (
        <div className={jetbrainsmono.className}>
            {children}
        </div>
    )
}