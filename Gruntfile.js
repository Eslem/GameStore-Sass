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
                },
                {
                    expand: true,
                    cwd: "public_html/admin/scss",
                    src: ["**/*.scss"],
                    dest: "public_html/admin/css",
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