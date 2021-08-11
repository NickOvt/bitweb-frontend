# BitWeb-Frontend

- This project uses **custom** **Webpack + Babel** setup with **ESLint and Prettier**
- For css and styling **Bootswatch** is used (Bootstrap themes)
- For CRUD requests **Axios** is used
- **SockJS + React-stomp** is used to connect to the Websocket API

### By default in this project React static files are served by Nginx in the Docker container

The application can be run in 4 different ways
1. Run `npm run build && npm run server` to build static React files and serve them using Express. **This way the app starts locally on the actual machine and not Docker!**
2. Run `npm run start` to run Webpack dev-server to dynamically compile the React app and have hot reloading.
3. Do nothing. When running docker-compose up, which can be found in the main repo, the Frontend container will be created and immediately ran. In that case Nginx is used to serve the static files. For reference open the Dockerfile found in the root of the project
4. It is also possible to use *Express* in the docker container. In that case go to the Dockerfile and comment everything above a comment that says *'Single-stage'* and there uncomment everything under the comment that says *'Serve React static files with Express instead of Nginx'*. Then go to the `docker-compose.yml` file that you should have by now cloned from the main repo and there go to the bottom where you see *frontend-react* and comment the *image* property (add ***#*** before it) and uncomment the *build* property. This way when you run `docker-compose up` again, it will build the image from the *Dockerfile* and use *Express* instead of *Nginx*.

### Available npm scripts:
- `npm run build` - run webpack to build the React app
- `npm run start` - run webpack dev server
- `npm run lint` - lint the JS files (using eslint)
- `npm run lint:fix` - fix auto-fixable errors
- `npm run format` - format the code using prettier
- `npm run server` - run Express server to serve React static files

