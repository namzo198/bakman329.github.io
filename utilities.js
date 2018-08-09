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

export function resetAdaptations() {
  localStorage.setItem('adaptations', JSON.stringify({}));
}

export function resetSession() {
  localStorage.setItem('session_id', "");
}

export function resetContactInfo(){
    localStorage.setItem('contactInfo',JSON.stringify({
        email:{
            email:'johndoe@gmail.com',
            AddEmailInfo:false,
            BasicEmailAdded:true
        },
        dob:{
            dob:'01 January',
            AddDobInfo:false,
            BasicDobAdded:true
        },
        year:{
            year:'1990',
            AddYearInfo:false,
            BasicYearAdded:true
        },
        gender:{
            gender:'Male',
            AddGenderInfo:false,
            BasicGenderAdded:true
        }
    }))
}

export function resetBlockedUsers(){
    localStorage.setItem('blockedUsers',JSON.stringify(["Richard Roe", "Jane Appleeseed"]))
}

export function resetBlockedApps(){
    localStorage.setItem('blockedApps',JSON.stringify(["Yahoo","Uber"]))
}

export function resetBlockedAppInvites(){
    localStorage.setItem('blockedAppInvites',JSON.stringify([]))
}

export function resetBlockedEventInvites(){
    localStorage.setItem('blockedEventInvites',JSON.stringify([]))
}

export function resetAll() {
  resetPosts();
  resetChat();
  resetSettings();
  resetFriends();
  resetAdaptations();
  resetSession();
  resetContactInfo();
  resetBlockedUsers();
  resetBlockedApps();
  resetBlockedAppInvites();
  resetBlockedEventInvites();
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

  if (!localStorage.adaptations) {
    resetAdaptations();
    location.reload();
  }
    
  if(!localStorage.contactInfo){
      resetContactInfo();
      location.reload();
  }
    
  if(!localStorage.blockedUsers){
      resetBlockedUsers();
      location.reload();
  }
    
   if(!localStorage.blockedApps){
       resetBlockedApps();
       location.reload();
   }
    
    if(!localStorage.blockedAppInvites){
        resetBlockedAppInvites();
        location.reload();
    }
    
    if(!localStorage.blockedEventInvites){
        resetBlockedEventInvites();
        location.reload();
    }

}

export function containsIgnoreCase(arr, str) {
  return arr.findIndex(item => str.toLocaleLowerCase() == item.toLocaleLowerCase()) != -1;
}


