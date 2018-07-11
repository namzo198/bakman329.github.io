export function indexPosts() {
   var posts = JSON.parse(localStorage.getItem('posts'));
   JSON.parse(localStorage.getItem('posts')).forEach((post, index, array) => {
      posts[index].key = posts.length - (index + 1);
   });
   localStorage.setItem('posts', JSON.stringify(posts));
}

// TODO: Maybe consolidate these defaults to a .JSON file
export function resetPosts() {
 localStorage.setItem('posts', JSON.stringify(
    [{name: 'John Doe',
      img: './assets/profile_img.jpg',
      content: 'Hi, I\'m John',
      comments: [{name: 'Jack Roe',
                  img: './assets/profile_img.jpg',
                  content: 'Hi, John. I\'m Jack',
                  liked: false}],
      key: 1},
     {name: 'Jack Roe',
      img: './assets/profile_img.jpg',
      content: 'There is a party at my house tommorow',
      comments: [],
      key: 0}]));
}

export function resetChat() {
  localStorage.setItem('incoming_messages', JSON.stringify(
    {'Jack Roe': ['Hello, John', 'How\'re you doing?']}));
  localStorage.setItem('outgoing_messages', '{}');
}

export function resetSettings() {
  // turn_off_chat: [setting, [list of "except" contacts], [list of "some" contacts]]
  localStorage.setItem('settings', JSON.stringify({"turn_off_chat": ["someContacts", [], []]}));
}

export function resetFriends() {
  // TODO: Add "users" storage variable, containing all users hardcoded into system, and use it to store profile pics, etc.
  localStorage.setItem('friends', JSON.stringify(["Jack Roe", "Jim Mend"]));
}

export function resetAll() {
  resetPosts();
  resetChat();
  resetSettings();
  resetFriends();
  location.reload();
}

export function verifyLocalStorage() {
  if (!localStorage.posts) {
    resetPosts();
    location.reload();
  }

  if (!localStorage.settings) {
    resetSettings();
    location.reload();
  }

  if (!localStorage.friends) {
    resetFriends();
    location.reload();
  }
}

export function containsIgnoreCase(arr, str) {
  return arr.findIndex(item => str.toLocaleLowerCase() == item.toLocaleLowerCase()) != -1;
}