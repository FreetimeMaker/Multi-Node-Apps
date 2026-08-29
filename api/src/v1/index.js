const express = require('express');
const router = express.Router();
const axios = require('axios');
const health = require('./health/health');
const supabaseRoutes = require('./auth/supabase');
const geoWeatherSubscriptions = require('./geoweather/subscriptions');
const fportApps = require('./fport/apps');
const walloraWallpapers = require('./wallora/wallpapers');
const arcadeRoutes = require('./arcade');

// Vercel (Rolldown) liefert gebündelte Module je nach Build-Variante als
// { default: <router> }, als Memo-Wrapper-Funktion oder direkt als Funktion.
// asRouter normalisiert alle Formen zu dem echten express.Router.
const isRouter = (x) => typeof x === 'function' && typeof x.use === 'function' && typeof x.get === 'function';
const asRouter = (m) => {
    if (isRouter(m)) return m;
    if (m && isRouter(m.default)) return m.default;
    if (m && typeof m.default === 'function') {
        const inner = m.default();
        if (isRouter(inner)) return inner;
    }
    if (typeof m === 'function') {
        const inner = m();
        if (isRouter(inner)) return inner;
    }
    return m;
};

router.use('/health', asRouter(health));
router.use('/auth', asRouter(supabaseRoutes));
router.use('/geoweather/subscriptions', asRouter(geoWeatherSubscriptions));
router.use('/fport/apps', asRouter(fportApps));
router.use('/wallora/wallpapers', asRouter(walloraWallpapers));
router.use('/arcade', asRouter(arcadeRoutes));

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the All API v1!',
        version: '1.5.0',
        endpoints: {
            'cross endpoints': {
                health: '/health',
                login: '/auth/login',
                logout: '/auth/logout'
            },
            'GeoWeather endpoints': {
                subscriptions: '/geoweather/subscriptions',
                plans: '/geoweather/subscriptions/plans',
                redeem: '/geoweather/subscriptions/redeem',
            },
            'F-Port endpoints': {
                apps: '/fport/apps'
            },
            'Wallora endpoints': {
                wallpapers: '/wallora/wallpapers'
            },
            'Arcade endpoints': {
                info: '/arcade',
                challenge: '/arcade/challenge',
                login: '/arcade/login',
                me: '/arcade/me',
                setup: '/arcade/setup',
                pass: '/arcade/pass/session',
                confirm: '/arcade/pass/confirm',
                play: '/arcade/play'
            }
        }
    });
});

module.exports = router;