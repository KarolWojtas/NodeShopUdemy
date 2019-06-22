"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const admin_1 = require("./routes/admin");
const shop_1 = require("./routes/shop");
const errorController = require('./controllers/error');
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', admin_1.default);
app.use(shop_1.default);
app.use(errorController.getNotFound);
exports.default = app;
//# sourceMappingURL=app.js.map