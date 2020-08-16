module.exports = {
    devServer: {
        host: 'localhost',
        disableHostCheck: true
    },
    pluginOptions: {
        apollo: {
            lintGQL: true,
        },
        s3Deploy: {
            awsProfile: 'default',
            pluginVersion: '4.0.0-rc3',
            region: 'sa-east-1',
            createBucket: false,
            staticHosting: true,
            staticErrorPage: 'index.html',
            staticIndexPage: 'index.html',
            assetPath: 'dist',
            assetMatch: '**',
            deployPath: '/',
            acl: 'public-read',
            uploadConcurrency: 5,
            pwa: false,
            enableCloudfront: true,
            cloudfrontMatchers: '/*',
            cacheControl: 'max-age=3600',
            gzip: true,
            gzipFilePattern: '**/*.{js,css,json,ico,map,xml,txt,svg,eot,ttf,woff,woff2}'
        }
    }
}
