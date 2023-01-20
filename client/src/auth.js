import {createAuthProvider} from "react-token-auth"


export const {useAuth, authFetch, login, logout} =
createAuthProvider({
    getAccessToken: 'access_token',
    onUpdateToken: (token) =>
        fetch('/authentication/refresh', {
            method: 'POST',
            body: token.refresh_token
        })
            .then(r => r.json()),
})