const { faker } = require('@faker-js/faker');
const fs = require('fs');

const generateUsers = (num) => {
  const users = [];
  for (let i = 0; i < num; i++) {
    users.push({
      _id: `org.couchdb.user:${faker.internet.userName()}`,
      name: faker.name.firstName(),
      password: faker.internet.password(),
      roles: [],
      type: 'user',
      displayName: faker.name.findName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatar(),
      bio: faker.lorem.sentence(),
    });
  }
  return users;
};

const generatePosts = (users, postsPerUser) => {
  const posts = [];
  users.forEach((user) => {
    for (let i = 0; i < postsPerUser; i++) {
      posts.push({
        _id: `post:${faker.datatype.uuid()}`,
        authorId: user._id,
        content: faker.lorem.paragraph(),
        timestamp: faker.date.past().toISOString(),
      });
    }
  });
  return posts;
};

const generateLikes = (users, posts) => {
  const likes = [];
  users.forEach((user) => {
    posts.forEach((post) => {
      if (faker.datatype.boolean()) {
        likes.push({
          _id: `like:${faker.datatype.uuid()}`,
          userId: user._id,
          postId: post._id,
        });
      }
    });
  });
  return likes;
};

const generateFollowers = (users) => {
  const followers = [];
  users.forEach((user) => {
    users.forEach((follower) => {
      if (user._id !== follower._id && faker.datatype.boolean()) {
        followers.push({
          _id: `follower:${faker.datatype.uuid()}`,
          userId: user._id,
          followerId: follower._id,
        });
      }
    });
  });
  return followers;
};

const fakeUsers = generateUsers(50);
const fakePosts = generatePosts(fakeUsers, 5);
const fakeLikes = generateLikes(fakeUsers, fakePosts);
const fakeFollowers = generateFollowers(fakeUsers);

// fs.writeFileSync('users.json', JSON.stringify(fakeUsers, null, 2));
fs.writeFileSync('posts.json', JSON.stringify(fakePosts, null, 2));
// fs.writeFileSync('likes.json', JSON.stringify(fakeLikes, null, 2));
// fs.writeFileSync('followers.json', JSON.stringify(fakeFollowers, null, 2));

console.log('Data saved to JSON files.');
