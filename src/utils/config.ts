export const APP_ROUTES = {
    public: {
        home: '/',
        authentication: '/Authentication'
    },
    private: {
        dashboard: '/Dashboard',
        settings: '/Settings'
    },
    api: {
        root: '/api'
    }
}

export function IsPublicRoute(pathName: string) {
    const publicRoutes = Object.values(APP_ROUTES.public);
    const includePublic = publicRoutes.includes(pathName);
    return includePublic;
}