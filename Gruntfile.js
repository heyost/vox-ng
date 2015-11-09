module.exports = function(grunt) {

	grunt.initConfig({
  		pkg: grunt.file.readJSON('package.json'),
    	connect: {
    		server: {
      			options: {
        			port: 8000,
        			hostname: '*',
        			base: {
						path: './'
					},
        			livereload: true,
        		}
          				
      		}
    	},
    	watch: {
    		html: {
    			files: '**/*.html',
    			options: {
			    	livereload: true,
			    },
    		},
    		js: {
    			files: '**/*.js',
    			options: {
			    	livereload: true,
			    },
    		}
    	}
  	});

  	grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

  
  	grunt.registerTask('default', ['connect', 'watch']);

};