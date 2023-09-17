import { Victor_Mono as Victor_MonoFont } from 'next/font/google'

const victormono = Victor_MonoFont({ subsets: ['latin'] });

export default function VictorMono({ children }) {
    return (
        <div className={victormono.className}>
            {children}
        </div>
    )
}