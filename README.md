## Grunt-Mocha-WD

### Environment Setup

1. Global Dependencies
    * Install [Node.js](https://nodejs.org/en/)

    * Install Grunt Globally
    ```
    $ npm install -g grunt-cli
    ```

2. Sauce Credentials
    * In the terminal export your Sauce Labs Credentials as environmental variables:
    ```
    $ export SAUCE_USERNAME=<your Sauce Labs username>
    $ export SAUCE_ACCESS_KEY=<your Sauce Labs access key>
    ```
    * Set Build ID (Optional):
    ```
    $ export BUILD_TAG=sauce_automated_build_name
    ```

3. Project Dependencies
    * Install Node modules
    ```
    $ npm install
    ```
4. For window users, you may want to update the grunt-mocha-parallel node_modules.

### Running Tests

* Tests in Parallel:
    ```
    $ grunt
    ```

[Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/)

### Resources
##### [Sauce Labs Documentation](https://wiki.saucelabs.com/)

##### [SeleniumHQ Documentation](http://www.seleniumhq.org/docs/)

##### [Node Documentation](https://nodejs.org/en/docs/)

##### [Mocha Documentation](https://mochajs.org/)

##### [Grunt ](http://gruntjs.com/getting-started)

##### [Stack Overflow](http://stackoverflow.com/)
* A great resource to search for issues not explicitly covered by documentation.