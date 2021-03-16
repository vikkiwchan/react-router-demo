const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.get('/api/users', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (err) {
    console.error(err);
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    res.send(await User.createRandomUser());
  } catch (err) {
    console.error(err);
  }
});

const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/react_redux_demo_db',
  { logging: false }
);

const User = db.define('user', {
  name: STRING,
});

User.createWithName = (name) => User.create({ name });

User.createRandomUser = function () {
  return this.create({ name: `${Math.floor(Math.random() * 100)} - user` });
};

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    const [moe, lucy, curly] = await Promise.all(
      ['moe', 'lucy', 'curly'].map(User.createWithName)
    );
  } catch (error) {
    console.error(error);
  }
};

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`app listening on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};

init();
