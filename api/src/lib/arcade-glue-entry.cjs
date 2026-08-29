'use strict';

// Statischer Einstiegspunkt für das arcade-glue-Bundle.
// Wird von esbuild in eine einzige CJS-Datei gebündelt (arcade-glue.cjs),
// damit Vercels Rolldown-Builder keine ESM-Transitivabhängigkeiten von
// Metaplex/umi mehr auflösen muss und die Module nicht stubbed.

const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { publicKey, createSignerFromKeypair } = require('@metaplex-foundation/umi');
const { createTree, mintV1 } = require('@metaplex-foundation/mpl-bubblegum');

module.exports = { createUmi, publicKey, createSignerFromKeypair, createTree, mintV1 };