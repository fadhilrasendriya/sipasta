import { useEffect } from "react";
import { useRouter } from "next/router";
import { getToken } from "src/utils/auth";

export const useAuth = () => {
    const router = useRouter();
    useEffect(() => {
        let token = getToken();
        console.log(token)
        if (token == null) {
            router.push("/login")
        }
    })
}