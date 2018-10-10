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
      content: 'Hi, I\'m John',
      comments: [{name: 'Jack Roe',
                  img: './assets/profile_img.jpg',
                  content: 'Hi, John. I\'m Jack',
                  liked: false}],
      hidden: false,
      audience: "public",
      key: 1},
     {name: 'Jack Roe',
      content: 'There is a party at my house tommorow',
      comments: [],
      hidden: false,
      key: 0,
      audience: "public"}]));
}

export function resetChat() {
  localStorage.setItem('incoming_messages', JSON.stringify(
    {'Jack Roe': ['Hello, John', 'How\'re you doing?']}));
  localStorage.setItem('outgoing_messages', '{}');
}

export function resetSettings() {
  // turn_off_chat: [setting, [list of "except" contacts], [list of "some" contacts]]
  // post_audience_settings: [setting, [list of "except" friends], [list of specific friends], [[List of custom groups/people to share with], [List not to share with]]]
  localStorage.setItem('settings', JSON.stringify({"turn_off_chat": ["someContacts", [], []], "post_audience_settings": ["public", [], [], [[], []]]}));
}

/* export function resetFriends() {
  localStorage.setItem('friends', JSON.stringify(["Jack Roe", "Jim Mend"]));
} */

export function resetUsers() {
  localStorage.setItem('users', JSON.stringify(
    [{name: "John Doe",
      profile_pic: 'profile_img.jpg',
      friend: false},
     {name: "Jack Roe",
      profile_pic: 'profile_img.jpg',
      friend: true},
     {name: "Jim Mend",
      profile_pic: 'profile_img.jpg',
      friend: true},
     {name: "Mike Booth",
      profile_pic: 'profile_img.jpg',
      friend: false}]));
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
  resetUsers();
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

  if (!localStorage.users) {
    resetUsers();
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

export function getProfilePic(name) {
  let users = JSON.parse(localStorage.users);

  let pic = "/assets/default_pic.jpg";
  users.some((element) => {
    if (element.name.toLocaleLowerCase() == name.toLocaleLowerCase()) {
      pic = "/assets/" + element.profile_pic;
      return true;
    }
  });

  return pic;
}

export function nameToLink(name) {
  return name.toLowerCase().split(' ').join('_');
}

export function linkToName(link) {
  let parts = link.split('_');
  parts.forEach(function(part, index) {
    parts[index] = part.charAt(0).toUpperCase() + part.substr(1);
  });

  return parts.join(' ');
}

export function audienceText(audience) {
  let text = "";
  switch (audience) {
    case "public":
      text = "Public";
      break;

    case "friends":
      text = "Friends";
      break;
    
    case "friends_except":
      text = "Friends except...";
      break;

    case "only_me":
      text = "Only Me"
      break;

    case "specific_friends":
      text = "Specific Friends"
      break;

    case "custom":
      text = "Custom"
      break;

    default:
      text = "";
  }

  return text;
}