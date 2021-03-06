var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var fs = require('fs');
var path = require('path');

describe('vaadin-elements-app', function() {
  before(function() {
    return helpers
      .run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        elementName: 'test-app',
        description: 'Test app'
      })
      .toPromise()
      .then(function(dir) {
        console.log(fs.readdirSync(dir));
      });
  });

  describe('bower.json', function() {
    it('should exist', function() {
      assert.file('bower.json');
    });

    it('should reflect properties', function() {
      assert.jsonFileContent('bower.json', {
        name: 'test',
        description: 'Test app',
      });
    });

    describe('dependencies', function() {
      var bowerJsonContent;

      before(function() {
        bowerJsonContent = JSON.parse(fs.readFileSync('bower.json'));
      });

      it('should list polymer', function() {
        assert.ok(bowerJsonContent.dependencies['polymer']);
      });

      it('should list vaadin-core', function() {
        assert.ok(bowerJsonContent.dependencies['vaadin-core']);
      });
    });
  });
});
