import { useEffect } from "react";

export default function useInterval (callback, interval, dependencies = []) {
    useEffect(() => {
        const id = setInterval(callback, interval);

        return () => clearInterval(id);
    }, [...dependencies]);
}
