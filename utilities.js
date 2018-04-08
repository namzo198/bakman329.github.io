export function indexPosts() {
   var posts = JSON.parse(localStorage.getItem('posts'));
   JSON.parse(localStorage.getItem('posts')).forEach((post, index, array) => {
      posts[index].key = posts.length - (index + 1);
   });
   localStorage.setItem('posts', JSON.stringify(posts));
}

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