const express = require('express');
const router = express.Router();
const axios = require('axios');
const health = require('./health/health');
const supabaseRoutes = require('./auth/supabase');
const geoWeatherSubscriptions = require('./geoweather/subscriptions');
const fportApps = require('./fport/apps');
const walloraWallpapers = require('./wallora/wallpapers');
const arcadeRoutes = require('./arcade');

// Vercel bundelt die Services mit esbuild: require() kann dort ein
// Namespace-Objekt ({ default: <fn> }) statt der Funktion selbst liefern.
const unwrap = (m) => (m && m.default ? m.default : m);

router.use('/health', unwrap(health));
router.use('/auth', unwrap(supabaseRoutes));
router.use('/geoweather/subscriptions', unwrap(geoWeatherSubscriptions));
router.use('/fport/apps', unwrap(fportApps));
router.use('/wallora/wallpapers', unwrap(walloraWallpapers));
router.use('/arcade', unwrap(arcadeRoutes));

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