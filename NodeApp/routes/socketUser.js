//Contributor : Hamza Mazhar

let users = [];

const addUser = ({ id, name, room, ip }) => {
  console.log(users);
  name = name.trim().toLowerCase();
  if (room) {
    room = room.trim().toLowerCase();
  } else {
    room = "public";
  }
  if (!name || !room) return { error: "Username and room are required." };
  users = users.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.name === value.name && t.room === value.room)
  );
  console.log(users);
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) {
    // console.log("existingUser Ip: "+existingUser.ip)
    // console.log("New User Ip: "+ip)
    if (existingUser.id !== id) {
      removeUser(id);
      users.push(existingUser);
    }
    return existingUser;
  } else {
    const user = { id, name, room, ip };
    users.push(user);
    return { user };
  }
};

const removeUser = (id) => {
  users = users.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.name === value.name && t.room === value.room)
  );

  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => {
  console.log("++++++++++here get the suer", id, users);
  return users.find((user) => {
    console.log("here is the user data", user);
    return user.id === id;
  });
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
