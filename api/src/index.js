const dotenv = require('dotenv');
const result = dotenv.config();

// Auf Plattformen wie Vercel werden Umgebungsvariablen direkt bereitgestellt,
// daher ist eine fehlende .env Datei dort normal.
if (result.error && !process.env.VERCEL) {
    console.warn('HINWEIS: Keine .env Datei gefunden (lokale Entwicklung?).');
} else if (!result.error) {
    console.log('.env Konfiguration geladen.');
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
app.set('trust proxy', true);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/arcade-assets', express.static(path.join(__dirname, 'arcade-assets')));

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the All API!',
        api: {
            version: '1.5.0',
            'v1 endpoints': {
                'cross endpoints': {
                    health: '/api/v1/health',
                    login: '/api/v1/auth/login',
                    logout: '/api/v1/auth/logout'
                },
                'GeoWeather endpoints': {
                    subscriptions: '/api/v1/geoweather/subscriptions',
                    plans: '/api/v1/geoweather/subscriptions/plans',
                    redeem: '/api/v1/geoweather/subscriptions/redeem',
                },
                'F-Port endpoints': {
                    apps: '/api/v1/fport/apps'
                },
                'Wallora endpoints': {
                    wallpapers: '/api/v1/wallora/wallpapers'
                },
                'Arcade endpoints': {
                    info: '/api/v1/arcade',
                    challenge: '/api/v1/arcade/challenge',
                    login: '/api/v1/arcade/login',
                    me: '/api/v1/arcade/me',
                    setup: '/api/v1/arcade/setup'
                }
            }
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

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
    return null;
};

// Rolldown schreibt `require('./v1')` intern zu `require_index.default` um.
// Sollte diese Interop-Property auf dem Server fehlen, laden wir den real
// ausgelieferten Chunk zur Laufzeit und normalisieren ihn ebenfalls.
const staticV1 = require('./v1');
let v1Router = asRouter(staticV1);
if (!v1Router) {
    try {
        const { createRequire } = require('node:module');
        v1Router = asRouter(createRequire(__filename)('./v1' + '/index.cjs'));
    } catch {
        v1Router = null;
    }
}
if (!v1Router) {
    const describe = (m) => {
        if (m == null) return `nullish(${typeof m})`;
        if (typeof m === 'function') return `fn(keys=${Object.keys(m).join(',')})`;
        return `obj(keys=${Object.keys(m).join(',') || '-'}, def=${typeof m.default}, defdef=${typeof (m && m.default && m.default.default)}, defefn=${typeof (m && m.default && m.default())})`;
    };
    let probe = null;
    try {
        const { createRequire } = require('node:module');
        probe = createRequire(__filename)('./v1' + '/index.cjs');
    } catch (e) {
        probe = `REQUIRE-ERR: ${e.message}`;
    }
    console.error(`[api-v1] static=${describe(staticV1)} chunk=${describe(probe)}`);
    throw new Error('[api] konnte ./v1 nicht als Router laden.');
}
app.use('/api/v1', v1Router);

// Falls die Datei direkt gestartet wird, Server starten
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    if (!process.env.PORT) {
        console.warn(`HINWEIS: PORT ist nicht in .env definiert. Nutze Standardport ${PORT}.`);
    }
    app.listen(PORT, () => {
        console.log(`Server läuft auf Port ${PORT}`);
    });
}

module.exports = app;