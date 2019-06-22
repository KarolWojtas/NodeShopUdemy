import * as express from 'express'
import * as path from 'path'
const bodyParser = require('body-parser');

import adminRoutes from './routes/admin'
import shopRoutes from './routes/shop'
const errorController = require('./controllers/error')

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getNotFound)


export default app; 