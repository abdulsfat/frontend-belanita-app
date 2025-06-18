import { useState, useEffect } from "react";
import useAuthStore from "@/app/_stores/authStore";

export default function useHasHydrated() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const unsub = useAuthStore.persist.onFinishHydration(() => {
            setHydrated(true);
        });

        // fallback: jika sudah hydrate sebelumnya
        if (useAuthStore.persist.hasHydrated()) {
            setHydrated(true);
        }

        return () => unsub?.();
    }, []);

    return hydrated;
}
