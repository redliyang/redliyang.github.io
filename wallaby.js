module.exports = () => ({
    files: [
        'wallaby/style/calculator.css',
        {
            pattern: 'wallaby/lib/jquery.js',
            instrument: false,
        },
        'wallaby/src/*.js',
        'wallaby/test/helper/template.js',
    ],
    tests: [
        'src/js/demo.js',
    ],
    debug: true,
})
