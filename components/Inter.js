import { Inter as InterFont } from 'next/font/google'

const inter = InterFont({ subsets: ['latin'] });

export default function Inter({ children }) {
    return (
        <div className={inter.className}>
            {children}
        </div>
    )
}