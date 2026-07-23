const withBundleAnalyzer =
    process.env.ANALYZE === 'true'
        ? require('@next/bundle-analyzer')({ enabled: true })
        : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
    reactStrictMode: true,
    // typescript: {
    //     // !! WARN !!
    //     // Dangerously allow production builds to successfully complete even if
    //     // your project has type errors.
    //     // !! WARN !!
    //     ignoreBuildErrors: true,
    // },
    images: {
        loader: 'custom',
        loaderFile: './image-loader.js',
        deviceSizes: [414, 828, 1024, 1920, 2560, 3840],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg)$/i,
            type: 'asset',
            resourceQuery: /url/, // *.svg?url
        });

        config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] },
            resourceQuery: { not: [/url/] },
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        prettier: false,
                        svgo: true,
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: { removeViewBox: false },
                                    },
                                },
                            ],
                        },
                        titleProp: true,
                    },
                },
            ],
        });

        config.module.rules.push({
            test: /\.(glsl|frag|vert)$/,
            use: [require.resolve('raw-loader'), require.resolve('glslify-loader')],
        });

        return config;
    },
});

module.exports = nextConfig;
