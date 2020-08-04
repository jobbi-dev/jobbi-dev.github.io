# Requirements
* NodeJS (v13.13.0 or later)
* npm (v6.14.4 or later)
* Gulp (v4.0.2 or later)

# Installation
Before start make sure to check your current environment.
```
node -v
npm -v
```

# Using Different Node Version
If your Node version is different from the required one, you can install and use [NVM – Node Version Manager](https://github.com/nvm-sh/nvm) This manager allows to use the specific Node version per project.
```
nvm use
```

# Installation
It's recommended to install Gulp and Gulp CLI globally so `gulp` command will be accessible via system terminal.
```
npm i -g gulp gulp-cli
npm i
```

# Configuration
In `gulpfile.js` specify the directories and optionally turn on/off minification:
```js
const
  compilation = {
    src: '.', // source dir (current)
    dist: '../HTML', // compilation dir
    minify: true
  };
```

# Usage
```
gulp default
```

In your browser open `http://localhost:3000/`
