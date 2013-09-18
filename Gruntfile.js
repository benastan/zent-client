module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.initConfig({
    browserify: {
      'default': {
        src: ['dist/zent.js'],
        dest: 'build/zent.js'
      }
    },
    coffee: {
      'default': {
        expand: true,
        flatten: false,
        cwd: 'src',
        src: ['**/*.coffee'],
        dest: 'dist',
        ext: '.js'
      }
    },
    env: {
      test: {
        src: '.env'
      }
    },
    uglify: {
      'default': {
        src: ['build/zent.js'],
        dest: 'build/zent.min.js'
      }
    },
    watch: {
      zent: {
        files: ['src/**/*.coffee', 'test.js', 'public/**/*'],
        tasks: ['default']
      }
    }
  });
  grunt.registerTask(
    'default',
    [
      'coffee:default',
      'browserify:default',
      'uglify:default'
    ]
  );
};
