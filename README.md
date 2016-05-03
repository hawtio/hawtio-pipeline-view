## hawtio-pipeline-view

This plugin provides a directive to visualize the stages in a Jenkins pipeline.

### Installing & Usage

To add the dependency to your project using bower, run the command

```
$ bower install --save hawtio-pipeline-view
```

Add the directive to your markup somewhere in your view:

```html
<div hawtio-pipeline-view></div>
```

In your controller you'll need a `build` attribute that contains a `stages` attribute, see (this file)[insert link here] for an example.

#### Building

To install dependencies, run the commands

```
$ npm install
$ bower install
```

To build, run the command

```
$ gulp build
```

#### Developing

Run

```
$ gulp
```

and point your browser to <http://localhost:2772/> to see a running example.

#### Output build to a different directory

When developing this plugin in a dependent console you can change the output directory where the compiled .js and .css go.  Just use the 'out' flag to set a different output directory, for example:

```
$ gulp watch --out=../fabric8-console/libs/hawtio-pipeline-view/dist/
```

or

```
$ gulp watch --out=../origin/assets/bower_components/hawtio-pipeline-view/dist/
```

Whenever the build completes the compiled .js file will be put into the target directory.  Don't forget to first do a `gulp build` without this flag before committing changes!
