const Constants = {
    LOGUI_CLIENTAPP_VERSION: '0.4.2',
    SPLASH_PERSIST_DELAY: 1000,  // How long should the splash screen display on the screen for before it begins to fade out (after loading is complete)?
    SPLASH_FADE_DURATION: 700,  // How long should the fade out effect last for? Ensure this matches @time-loadingSplash-fade-duration in loadingSplash.less!

    SESSIONSTORAGE_AUTH_TOKEN: 'logui-authToken',  // The key in SessionStorage for keeping tabs of the authentication token to communicate with the server.

    SERVER_API_ROOT: 'http://localhost:8000/api/',  // The root of the API server.
}

export default Constants;