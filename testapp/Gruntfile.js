/*global module:false*/
module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help with optimising build
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    //Project settings
    yeoman: {
      // Configuration paths
      app: 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on them
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
      files: ['test/spec/{,*/}*.js'],
      tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
      files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
      tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,/*}*.css',
          '<%= yeoman.app %>/images/{,*}*.{gif,jpeg,jpg,png}'
        ]
      }
    }
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
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
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // The actual grunt server settings
  connect: {
    options: {
      port: 9000,
      livereload: 35729,
      //Change this to '0.0.0.0' to access the server
      hostname: 'localhost'
    },
    livereload: {
      options: {
        open: true,
        base: [
          '.tmp',
          '<%= yeoman.app %>'
        ]
      }
    },
    test: {
      options: {
        open: true,
        base: [
          '.tmp',
          '<% yeoman.app %>'
        ]
      }
    },
    dist: {
      option: {
        opem: true,
        base: '<%= yeoman.dist %>',
        livereload: false
      }
    }
  },

  // Empties folder to start fresh
  clean: {
    dist: {
      files: [{
        dot: true,
        src: [
          '.tmp',
          '<%= yeoman.dist %>/*',
          '!<%= yeoman.dist %>/.git*'
        ]
      }]
    },
    server: '.tmp'
  }

  // Make sure code styles are up to par
  jshint: {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    all: [
      'Gruntfile.js',
      '<%= yeoman.app %>/scripts/{,*/}*.js',
      '!<%= yeoman.app %>/scripts/vendor/*',
      'test/spec/{,*/}*.js'
    ]
  },

  // Mocha testing framework configuration options
  mocha: {
    all: {
      options: {
        run: true,
        urls: ['http://<%= connect.test.options.html']
      }
  },

  // Add vendor prefixed styles
  autoprefixer: {
    options: {
      browsers: ['last 1 version']
    },
    dist: {
      files: [{
        expand: true,
        cwd: '.tmp/styles/',
        src: '{,*/}*.css',
        dest: '.tmp/styles/'
      }]
    }
  },

  // Automatically inject Bower components into the HTML
  'bower-install': {
    app: {
      html: '<%= yeoman.app %>/index.html',
      ignorePath: '<%= yeoman.app %>/'
    }
  },

  // Copies remaining files to places other tasks can 
  copy: {
    dist: {
      files: [{
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>',
        dest: '<%= yeoman.app %>',
        src: [
          '*/{ico,png,txt}',
          '.htaccess',
          'images/{,*/}*.webp',
          '{,*/}*.html',
          'styles/fonts/{,*/}*.*'
        ]
      }]
    },
    styles: {
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>/styles',
      dest: '.tmp/styles/',
      src: '{,*/}*.css'
    }
  },

  // Run some tasks in parallel to speed up build process
  concurrent: {
    server: [
      'copy:styles'
    ],
    test: [
      'copy:styles'
    ],
    dist: [
      'copy:styles',
      'imagemin',
      'svgmin'
    ]
  }

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keep']);
    }

    grunt.task.run([
        'clean:server',
        'concurrent:server',
        'autoprefixer',
        'connect:livereload',
        'watch'
      ]);
  });

  grunt.registerTask('server', function() {
    grunt.log.warn('The `server` task has been deprecated');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', function(target) {
    if(target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
        ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
      ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
    ]);

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
