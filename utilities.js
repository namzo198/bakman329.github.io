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
    [{"name":"Alex Doe",
       "img":"./assets/alex_profile_img.jpg",
       "content":"\nMy job interview last week sucked, the interviewer was a jackass who seemed not to know what it is exactly they were looking for. Complete waste of my time! 😡",
       "key":20,
       "comments":[],
       "audience":"public"},
      {"name":"Alex Doe",
       "img":"./assets/alex_profile_img.jpg",
       "content":"To all those who treat women like trash you ought to stop!! #thefuckwrongwithyou!",
       "key":19,
       "comments":[],
       "audience":"public"},
       {"name":"Alex Doe",
        "img":"./assets/alex_profile_img.jpg",
        "content":"I think I'm gonna buy an iPhone this Christmas.",
        "key":18,
        "comments":[],
        "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"When you order a headphone dongle and Apple sends you a set of AirPods instead... I guess that works too?\nTook me some moral fortitude to let them know about their mistake 😂",
         "key":17,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"It's that time of the year again when people are trying to sell their old iPhone 😊\nI have an unblemished 64GB silver iPhone 6 Plus with a new battery. Let me know if you're interested!",
         "key":16,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"Digging the low-light capabilities of the new iPhone 📱",
         "key":15,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"\nImagine that Graham had won the nomination and election instead of Trump. Would it really have made a difference? He’d still be the same hate-filled ball of shit, only he’d have kept it covered in that thin veneer of fake decency that his buddy McCain used to fool moderates and liberals into thinking he was a good man. If Trump did one great service to this nation, it’s making these assholes show their true colors. Sure, there are many Republicans who don’t care, but the world will not forget! History is never kind on these kinds of scumbags.",
         "key":14,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"Can I have a profile badge of Mitch McConnell's dick in my face? Because that's how I ( and I suspect many others) feel right now.",
         "key":13,
         "comments":[],
         "audience":"friends"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"So many things, so little time #keepPushing",
         "key":12,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"If you want it, you must work for it! You can rest when you arrive, but until then, not time can be wasted. You may have to wake up early or go to bed late. You many miss some events or tv shows. You might even lose some fake friends. But if you want it, you must work for it!!!",
         "key":11,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"Destroy the idea that you have to have to be constantly working or grinding in order to be successful. Embrace the concept that rest, recovery and reflection are essential parts of the progress.",
         "key":10,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"You cannot treat people like 🗑️garbage and worship God at the same time!!😇🤔",
         "key":9,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"Living one day at a time; \nenjoying one moment at a time; \naccepting hardships as the pathway to peace. \n#idowhatican #letgoofwhaticannot #maintainingpeace",
         "key":8,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":" Your journey is not the same as others. Focus on your journey and never look down on anyone else’s journey.👌🏾👌🏾👌🏾",
         "key":7,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"Good morning 🌼❤️🌝 ‭ beautiful people, me and my love, we wish you a lovely happy day!",
         "key":6,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"It’s been a great weekend #Clemsonhomecomingweekend 💙",
         "key":5,
         "comments":[],
         "audience":"public"},
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"There is beauty in being you✨🖤\n",
         "key":4,
         "comments":[],
         "audience":"public"},  
        {"name":"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"...another beautiful day 🌸😍\nThe rain gives me December vibes...Thank you My God #itsrainingoutside☔️ #nothingbutgratitude #beautifulday #weareblessed",
         "key":3,
         "comments":[],
         "audience":"public"},
        {name:"Alex Doe",
         "img":"./assets/alex_profile_img.jpg",
         "content":"Mexicans should get the f--k out of here and go back to their f--king country !!!",
         "key":2,
         "comments":[],
         "audience":"public"},
        {"name":"Jack Scout",
         "content":"There is a party at my house tommorow",
         "comments":[],
         "hidden":false,
         "key":1,
         "audience":"public"},
        {name: 'Alex Doe',
         content: 'Hi, I\'m Alex',
         comments: [{name: 'Jack Scout',
                  img: './assets/users/jack_profile_img.jpg',
                  content: 'Hi, Alex. I\'m Jack',
                  liked: false}],
         hidden: false,
         audience: "public",
         key: 0}]));
}

export function resetChat() {
  localStorage.setItem('incoming_messages', JSON.stringify(
    {'Jack Roe': ['Hello, Alex', 'How\'re you doing?']}));
  localStorage.setItem('outgoing_messages', '{}');
}

export function resetSettings() {
  // turn_off_chat: [setting, [list of "except" contacts], [list of "some" contacts]]
  // post_audience_settings: [setting, [list of "except" friends], [list of specific friends], [[List of custom groups/people to share with], [List not to share with]]]
  localStorage.setItem('settings', JSON.stringify({"turn_off_chat": ["someContacts", [], []], "post_audience_settings": ["public", [], [], [[], []]]}));
}

/*export function resetFriends() {
  localStorage.setItem('friends', JSON.stringify(["Jack Roe", "Jim Mend"]));
}*/ 

export function friendsList() {
    
    var friends = [];
    
    JSON.parse(localStorage.getItem('users')).forEach((user, index, array) => {
      if (user.friend) {
        friends.push(user)
      } 
     // var name = user.name;
       /// console.log (name);
     
    });
           
    //console.log(friends);
   return friends;
}


export function resetUsers() {
  localStorage.setItem('users', JSON.stringify(
    [{name: "Alex Doe",
      profile_pic: 'alex_profile_img.jpg',
      friend: false},
     {name: "Jack Scout",
      profile_pic: 'jack_profile_img.jpg',
      friend: true},
     {name: "Jim Mend",
      profile_pic: 'jim_profile_img.jpg',
      friend: true},
     {name:"Sasha Riley",
     profile_pic:'sasha_profile_img.jpg',
     friend:true},
     {name:"Kyle Parker",
     profile_pic:'kyle_profile_img.jpg',
     friend:true},
     {name:"Loren Payton",
     profile_pic:'loren_profile_img.jpg',
     friend:true},
     {name: "Mike Booth",
      profile_pic: 'mike_profile_img.jpg',
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
        mobile:'3014672967',
        email:'alexdoe@gmail.com',
        dob:'01 January',
        year:'1990',
        gender:'Human',
        /**email:{
            email:'alexdoe@gmail.com',
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
            gender:'Custom',
            AddGenderInfo:false,
            BasicGenderAdded:true
        }*/
    }))
}

export function resetAdaptationDisplay(){
    localStorage.setItem('visited',JSON.stringify({
        DeletePost:{
            suggestion:false,
            highlight:false,
            automation:false
        },
        
        LikePost:{
            suggestion:false,
            highlight: false,
            automation:false
        },
        
        ContactInfo:{
            suggestion:false,
            highlight:false, 
            automation:false
        },
        Privacy_futureRequests:{
            suggestion:false,
            highlight:false,
            automation:false,
        },
        Timeline_seePost:{
            suggestion: false,
            highlight:false,
            automation:false
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
  resetAdaptationDisplay()
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
    
  if (!localStorage.visited) {
    resetAdaptationDisplay()
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

export function getParsed(name){
    return JSON.parse(localStorage.getItem(name));
}


export function addToLocalStorageObject (name,value){
    
    
    return localStorage.setItem(name, JSON.stringify(value));   
}

export function saveVisitedAdaptation (feature, adaptationName){
    let adaptationVisited = getParsed("visited")
    adaptationVisited[feature][adaptationName] = true
    addToLocalStorageObject("visited",adaptationVisited)
}

export function containsIgnoreCase(arr, str) {
  return arr.findIndex(item => str.toLocaleLowerCase() == item.toLocaleLowerCase()) != -1;
}

export function getProfilePic(name) {
    
  let users = JSON.parse(localStorage.users);
//TODO: Fix the default image when their is an update to the 'users' localStorage
  let pic = "/assets/users/alex_profile_img.jpg";
  users.some((element) => {
    if (element.name.toLocaleLowerCase() == name.toLocaleLowerCase()) {
      pic = "/assets/users/" + element.profile_pic;
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

    default:
      text = "";
  }

  return text;
}

