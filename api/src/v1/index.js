const express = require('express');
const router = express.Router();
const axios = require('axios');
const health = require('./health/health');
const supabaseRoutes = require('./auth/supabase');
const geoWeatherSubscriptions = require('./geoweather/subscriptions');
const fportApps = require('./fport/apps');
const walloraWallpapers = require('./wallora/wallpapers');
const arcadeRoutes = require('./arcade');

router.use('/health', health);
router.use('/auth', supabaseRoutes);
router.use('/geoweather/subscriptions', geoWeatherSubscriptions);
router.use('/fport/apps', fportApps);
router.use('/wallora/wallpapers', walloraWallpapers);
router.use('/arcade', arcadeRoutes);

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