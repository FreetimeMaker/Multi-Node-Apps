const express = require('express');
const router = express.Router();
const axios = require('axios');
const health = require('./health/health');
const supabaseRoutes = require('./auth/supabase');
const geoWeatherSubscriptions = require('./geoweather/subscriptions');
const fportApps = require('./fport/apps');
const walloraWallpapers = require('./wallora/wallpapers');

router.use('/health', health);
router.use('/auth', supabaseRoutes);
router.use('/geoweather/subscriptions', geoWeatherSubscriptions);
router.use('/fport/apps', fportApps);
router.use('/wallora/wallpapers', walloraWallpapers);

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the All API v1!',
        version: '1.5.0',
        endpoints: {
            'cross endpoints': {
                health: '/v1/health',
                login: '/v1/auth/login',
                logout: '/v1/auth/logout'
            },
            'GeoWeather endpoints': {
                subscriptions: '/v1/geoweather/subscriptions',
                plans: '/v1/geoweather/subscriptions/plans',
                redeem: '/v1/geoweather/subscriptions/redeem',
            },
            'F-Port endpoints': {
                apps: '/v1/fport/apps'
            },
            'Wallora endpoints': {
                wallpapers: '/v1/wallora/wallpapers'
            }
        }
    });
});

module.exports = router;