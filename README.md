Standard Environment Tools
1. Package Manager
  * Node's npm tool
  * package.json: where our dependencies will live
  * yarn is a common alternative package manager

2. Transpiler
  * Babel
  * used to translate JSX into ES5
  * Typescript can also be used to work with JSX in place of Babel
  * React projects can also be written entirely in JavaScript, eliminating the need for a transpiler

3. Module Bundler
  * Webpack
  * module bundler collects source code and dependency code and concatenates it into one big file
  * benefits include: decrease load times by putting all dependencies into a bundle, minifying code for faster load times
  * Webpack benefits: supports plugins and loaders and offers a development server that can live update as you code
  * other module bundlers include: Browserify, RequireJS, jspm, SystemJS

Set-Up
1. Initialize npm (npm init)

2. .gitignore file with .DS_STORE, node_modules, build

3. Install dependencies:
  * React and ReactDOM: npm install react@15.5.4 react-dom@15.5.4 --save
  * Webpack: npm install webpack@3.4.0 --save-dev
  * Webpack global for access to webpack terminal commands: npm install webpack@3.4.0 -g

4. webpack.config.js : see webpack-config-starter.js for basic set-up

5. Install Babel tools: npm install babel-core@6.24.1 babel-loader@7.0.0 babel-preset-es2015@6.24.1 babel-preset-react@6.24.1 --save-dev
  * babel-core: primary Babel library
  * babel-loader: loader tool used to integrate Babel with Webpack
  * babel-preset-es2015: contains information for Babel to transpile our code into ES5
  * babel-preset-react: contains information for Babel to understand our React code in order to transpile it correctly

6. Configure webpack and babel to work together: see webpack-config-starter.js for basic set-up

7. Remove CDN links in index.html (if there are any) since we have set up npm to handle that dependency

8. Link the file where we are storing our bundled code in index.html
  * Should be linked at the bottom of the html, after the closing <body> tag
  * If we look in our webpack-config-starter file we can see which file to link in the output section
  * <script src="build/app.bundle.js"></script>

9. Import React libraries into index.jsx
  * import React from "react";
  * import ReactDOM from "react-dom";

10. If needed, we can install the dependency for strict data types for props:
  * npm install prop-types@15.5.10 --save
  * import this dependency into any files we are declaring prop types in: import PropTypes from "prop-types";
  * declare an instance of the propTypes object on the component (aka defining a propTypes property on the component) right before the export statement:
    - ComponentName.propTypes = {};
  * within the curly brackets, we put in the props the component accepts and the data type each one should be:
    - ComponentName.propTypes = {
      prop1: PropTypes.string,
      prop2: PropTypes.number
    };

11. Add a development server
  * npm install webpack-dev-server@2.5.0 -g
  * npm install webpack-dev-server@2.5.0 --save-dev
  * Now we can bundle and serve projects with the following commands:
    - webpack
    - webpack-dev-server

12. Set up Hot Module Replacement (HMR): this will enable us to update live without having to run the above commands
  * npm install react-hot-loader@3.0.0-beta.7 --save-dev
  * update webpack.config.js (see webpack-config-starter file for details)
  * update index.jsx
    - import { AppContainer } from "react-hot-loader";
      * AppContainer is a wrapper component from React-Hot-Loader that handles reloading the application and sending errors if anything goes wrong
    - this is how the content changes:
    const render = (Component) => {
      ReactDOM.render(
        <AppContainer>
        <Component />
        </AppContainer>,
        document.getElementById('react-app-root')
      );
    };

    render(App);

    if (module.hot) {
      module.hot.accept('./components/App', () => {
        render(App)
      });
    }
  * install html-webpack-plugin
    - npm install html-webpack-plugin@2.29.0 --save-dev
  * update webpack.config file with HtmlWebpackPlugin (see webpack-config-starter file)
  * replace current index.html with a template file
    1. delete current index.html file
    2. replace with template.ejs
      * .ejs refers to a templating engine called Embedded JavaScript
      * template.ejs should be at top level of project and look like this:
    <!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
  <body>
    <% if (htmlWebpackPlugin.options.appMountId) { %>
      <div id="<%= htmlWebpackPlugin.options.appMountId%>"></div>
    <% } %>
  </body>
</html>

13. Set up start script in package.json
  * Add "start": "webpack-dev-server" to the "scripts" section of package.json
  * this will add the $ webpack-dev-server command anytime you run $ npm run start

14. Set Up ESLint
  * npm install eslint@4.13.1 -g
  * npm install eslint@4.13.1 --save-dev
  * eslint --init
    ? How would you like to configure ESLint?
    Answer questions about your style
    ? Are you using ECMAScript 6 features? Yes
    ? Are you using ES6 modules? Yes
    ? Where will your code run? Browser
    ? Do you use CommonJS? No
    ? Do you use JSX? Yes
    ? Do you use React? Yes
    ? What style of indentation do you use? Spaces  
    ? What quotes do you use for strings? Single
    ? What line endings do you use? Unix
    ? Do you require semicolons? Yes
    ? What format do you want your config file to be in? JSON
    * change "indent" number in .eslintrc.json from 4 to 2
  * npm install eslint-plugin-react -g
  * npm install eslint-plugin-react --save-dev
  * add "lint": "eslint src/** src/**/**; exit 0" to package.json "scripts" section
  * add "react/jsx-uses-vars": 2 to the "rules" section of .eslintrc.json; this tells ESLint that component names in JSX count as use of a variable
  * add "react/jsx-uses-react": 2 to the "rules" section of .eslintrc.json; this tell ESLint that the React library is not an unused variable
  * surround code that shouldn't be linted with:
    /*eslint-disable */ /*eslint-enable */
  * add rules to .eslintrc.json
    "react/jsx-no-duplicate-props": 2, (catches duplicate prop names being passed into a component)
    "react/jsx-no-undef": 2, (catches JSX variables that are undeclared)
    "react/no-multi-comp": 2, (prevents us from declaring multiple components in a single file; each component should have its own file)
    "react/jsx-indent-props": [
        "error",
        2
      ], (checks to ensure we are breaking out props passed into components into separate lines and indenting them the correct amount)
    "react/jsx-pascal-case": 2, (ensures all component names are written in pascal case)
    "react/prop-types": 2,
    "react/jsx-indent": [
        "error",
        2
    ], (validates proper indentation for content nested within JSX tags; 2 is the number of spaces it is checking for and must match the number on our general "indent" rule)
  * run $ npm run lint to lint your code
  * run $ npm install eslint-loader --save-dev
  * add eslint-loader to rules array in webpack.config.js
  * add "lint-fix": "eslint src/** src/**/** --fix; exit 0" to "scripts" section of package.json (this allows you to run "npm run lint-fix" and it will fix minor issues like indentation)

15. Configure CSS Modules
  * npm install --save styled-jsx
  * update webpack.config with "styled-jsx/babel": this updates our babel-loader to compile CSS and push them to the head of the DOM when the page gets loaded
  * wrap styles within components in <style jsx>{}</style> tags with styles being typed in the same way as they would in a CSS stylesheet; the style tags should go within the <div> that is being rendered
  * CSS modules are locally scoped to the component that contains them
  * when we render our app, the components are given a unique class by Styled-JSX and that class is added to all elements within that component

16. Implement React-Router
  * npm install react-router-dom@4.0.0 --save
  * import HashRouter into index.jsx
  * wrap App component's JSX tags in <HashRouter> tags
  * import Switch and Route into our App.jsx
    - Route: each different page in our app will correspond with a Route in our router
    - Switch: determines which route matches the path the user is requesting; when we have multiple routes they should reside inside a switch component, which will allow the React-Router to iterate through the routes and locate the one that matches the page the user is requesting
  * routes will be placed within <Switch></Switch> tags
    - <Route exact path='/' component={TicketList} />
    - path: the URL that corresponds with the route
    - exact: this keyword is necessary on the '/' route because there are slashes in all the paths, so it can confuse the system to think that anything with a slash is matching, so we tell it to only find that exact path of '/'
    - component: the component that should be loaded when the route is invoked
    - anything that shows a route with a # in it is a route that was NOT sent to the server, and is thus client-side; a # must be inserted in order to view the route in spite of it not being shown in the router tag
  * Linking Between Routes
    - import Link into component where we will be using the links
    - insert Link tags in the same way you would use <a> tags into the jsx code
      * ex: <Link to="/">Home</Link>

17. Adding Images
  * install url-loader, which webpack uses to convert images to text (base64)
    - npm install url-loader@0.6.2 --save-dev
  * install file-loader, which handles extra-large images that url-loader cant handle
    - npm install file-loader@1.1.6 --save-dev
  * create a new rule in webpack.config for the 'url-loader' (see webpack-config-starter for explanation)
  * restart development server to see changes
  * images should be stored in src/assets/images
  * import photo into the component you want to use it in like this:
    - import reallyAdorablePuppy from '../assets/images/cutestpuppy.jpg';
  * then place the img tag in the JSX of that component like this:
    - <img src={reallyAdorablePuppy}/>

18. Create An Error Route
  * create a new Route (<Route component={Error404} />), component and import statement for that component
    - no path is used in our Route because we only want to display Error404 when the user attempts to travel to a location that does not exist; the <Switch> will iterate through all paths inside of it, and if it doesn't find a path, the Error component will be rendered
  * within Error404 component, import Link so you can include a link to the Home page or another page since the page requested cannot be found
  * TO CUSTOMIZE:
    - pass props to our Error404 function in the component like this:
    function Error404(props){
      console.log(props);
    }
    - use the console log results to see the built in props in the route
    - use these to put that data into your component's JSX code like this:
      * <h2>The page {props.location.pathname}  does not exist!</h2>
    - declare a propType for the prop you are trying to insert
      * import PropTypes
      * insert propTypes declaration just above your export statement at the bottom of your component like this:
        - Error404.propTypes = {
          location: PropTypes.object
          };

CREATING THE APP COMPONENT
1. Create components folder in src folder
2. Create main App component file (App.jsx) within components folder
  * import React from "react"
  * component function always begins with a capital letter and matches the filename
    - function App() {
      return (
        JSX code to show in browser
        );
      }
  * function returns the JSX code that the component will render in the browser
  * components reside in their own file and are exported as a module at the bottom of the file
    - export default App;
3. Render the App component in index.jsx
  * import App component at the top of the index.jsx file and add the <App/> tag in the render() method
4. Run $ webpack to see changes

OTHER COMPONENTS
1. Basic component file structure:
* import React from "react"
* component function always begins with a capital letter and matches the filename
  - function ComponentName() {
    return (
      JSX code to show in browser
      );
    }
* function returns the JSX code that the component will render in the browser
* components reside in their own file and are exported as a module at the bottom of the file
  - export default ComponentName;
2. Import component into any files that need access to it in order to render it; any parent files its tags appear in
3. Insert into other component files via its tag which looks like this: <ComponentName/>

ADDING PROPS
1. Props can be added within component tags (in the file they are being rendered in) like this:
  * <ComponentName
      prop1="prop1value"
      prop2="prop2value" />
2. Props can be accessed by passing an argument (can be any word) into the receiving component's function like this:
  * function ComponentName(argument) {
    return (
      <h1>{argument.prop1}</h1>
      );
  }

LOOPING
1. We create an array variable that holds a list of objects we want to loop through within the component file (TicketList.jsx) where we want to loop through them (this is not needed if we are getting information via a database):
  var masterTicketList = [
    {
      names: 'Thato and Haley',
      location: '3A',
      issue: 'Firebase wont load data'
    },
    {
      names: 'John and Wilma',
      location: '3B',
      issue: 'We pooped our pants'
    },
    {
      names: 'Todd and Genevieve',
      location: '4C',
      issue: 'Why are all the computers disappearing?'
    }
  ];
2. We place a loop within the function of that component:
  function TicketList() {
    return (
      <div>
        <hr/>
        {masterTicketList.map((ticket, index) =>
        <Ticket names={ticket.names}
        location={ticket.location}
        issue={ticket.issue}
        key={index} />
    )}
      </div>
    );
  }
  * here we are looping through the array of Tickets called "masterTicketList" using the map function
  * we call the item it is looping through "ticket" (arbitrarily like in foreach loops) and the second parameter is "index", which just refers to the index of that particular "ticket" within the array
  * we tell it to print a Ticket on each iteration and assign the names, location and issue according to which object is being passed through and its corresponding property. That then gets passed through to the Ticket component, which is controlling how each Ticket is displayed:
    function Ticket(props) {
      return (
        <div>
          <h3>{props.location} - {props.names}</h3>
          <p><em>{props.issue}</em></p>
          <hr/>
        </div>
      );
    }
  * we must assign each item a "key" that is just whatever its index in the array is, since it needs to have a unique key prop
3. Lint for key props
  * add "react/jsx-key": 2 to the eslintrc.json file (alerts if it catches a jsx map() loop without a key prop
