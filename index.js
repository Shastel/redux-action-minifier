const compressionVocabulary = {
    type: 't',
    payload: 'p',
    error: 'e',
    meta: 'm',
};

const decompressionVocabulary = {
    t: 'type',
    p: 'payload',
    e: 'error',
    m: 'meta',
};

function createBase(vocabulary) {
    return function(action) {
        return Object.keys(action).reduce(function(R, key) {
            if (vocabulary[key]) {
                const newKey = vocabulary[key];
                R[newKey] = action[key];
            } else {
                R[key] = action[key];
            }

            return R;
        }, {});
    };
}

const defaultCompressor  = createBase(compressionVocabulary);
const defaultDeconpressor = createBase(decompressionVocabulary);

function createAdvanced(fnc, opts) {
    const isAdvanced = Object.keys(opts).length;

    return function(action) {
        const base = fnc(action);

        if (!isAdvanced) {
            return base;
        }

        return Object.keys(base).reduce((R, key) => {
            const modifyer = opts[key];
            const f = action[key];

            if (modifyer) {
                R[key] = modifyer(f, base, action);
            }

            return R;
        }, base);
    };
}

function createCompressor(opts) {
    return createAdvanced.call(null, defaultCompressor, opts);
}


function createDecompressor(opts) {
    return createAdvanced.call(null, defaultDeconpressor, opts);
}

exports.compressor = defaultCompressor;
exports.decompressor = defaultDeconpressor;
exports.createCompressor = createCompressor;
exports.createDecompressor = createDecompressor;
