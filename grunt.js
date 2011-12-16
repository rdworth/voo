/*global config:true, task:true*/
config.init({
  meta: {
    name: 'voo.js',
    version: '0.1.0',
    description: 'video playback with an interactive transcript',
    homepage: 'http://github.com/rdworth/voo',
    author: 'Richard D. Worth',
    license: ['MIT'],
    copyright: 'Copyright (c) 2011 Bocoup, LLC',
    repository: 'git://github.com/rdworth/voo.git',
    banner: '/* {{meta.name}} - v{{meta.version}} - {{today "m/d/yyyy"}}\n' +
            ' * {{meta.homepage}}\n' + 
            ' * {{{meta.copyright}}}; Licensed {{join meta.license}} */'
  },
  concat: {
    'dist/voo.js': ['<banner>', '<file_strip_banner:lib/voo.js>']
  },
  min: {
    'dist/voo.min.js': ['<banner>', 'dist/voo.js']
  },
  test: {},
  lint: {
    files: ['grunt.js', 'lib/**/*.js'],
    built: 'dist/voo.js'
  },
  watch: {
    files: '<config:lint.files>',
    tasks: 'default'
  },
  jshint: {
    options: {
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      eqnull: true,
      browser: true
    },
    globals: {
      jQuery: true
    }
  },
  uglify: {
    mangle: {except: ['$']}
  }
});

// Default task.
task.registerTask('default', 'lint:files concat lint:built min');
