## hawtio-pipeline-view

This plugin provides a directive to visualize the stages in a Jenkins pipeline.

### Installing & Usage

`bower install --save hawtio-pipeline-view`

Add the directive to your markup somewhere in your view:

`<div hawtio-pipeline-view></div>`

In your controller you'll need a `build` attribute that contains a `stages` attribute, see (this file)[insert link here] for an example.

#### Building

`gulp build`

#### Developing

`gulp` will start up a server, however there's no sample data as of yet

#### Output build to a different directory

When developing this plugin in a dependent console you can change the output directory where the compiled .js and .css go.  Just use the 'out' flag to set a different output directory, for example:

`gulp watch --out=../fabric8-console/libs/hawtio-pipeline-view/dist/`

or

`gulp watch --out=../origin/assets/bower_components/hawtio-pipeline-view/dist/`

Whenever the build completes the compiled .js file will be put into the target directory.  Don't forget to first do a `gulp build` without this flag before committing changes!

