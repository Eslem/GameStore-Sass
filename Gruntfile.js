module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
			
			dist: {
				files: [
                {
                    expand: true,
                    cwd: "public_html/cliente/scss",
                    src: ["**/*.scss"],
                    dest: "public_html/cliente/css",
                    ext: ".css"
                }
            ]
			}
		},
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
}