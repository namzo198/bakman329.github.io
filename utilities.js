import React from 'react';
import ProfileLink from './components/ProfileLink.jsx';
import {CreateEvent} from './controller/databaseFunctions.js';



export function registerEvent(action, details, object) {
    
    let  event = {
        action: action,
        details: details,
        object:object,
        session: localStorage.session
    };
    
    CreateEvent(event)
}

export function getSession(){
    return localStorage.session;
}


export function indexPosts() {
   var posts = JSON.parse(localStorage.getItem('posts'));
   JSON.parse(localStorage.getItem('posts')).forEach((post, index, array) => {
      posts[index].key = posts.length - (index + 1);
   });
   localStorage.setItem('posts', JSON.stringify(posts));
}


export function resetPosts() {
 localStorage.setItem('posts', JSON.stringify(
    [
    
    {"name":"Sasha Riley",
     "img":"/assets/sasha_profile_img.jpg",
     "content":"Looking to fill our open project manager role at RBW. Got any friends who you think would be interested, send them my way!",
     "key":44,
     "comments":[],
     "audience":"public",
     "time":"Yesterday"},
        
     {"name":"Esther Rorgash",
        "content":"I am good friends with Alex Doe",
         "comments":[],
         "hidden":false,
         "key":43,
         "audience":"public",
         "time": "Just now",
     },
        
    {"name":"Trevin Noushy",
        "content":"Haha I didn’t know your birthday was 4/20 🤪. Hope you get to smoke some good weed today, bro! 😏 ",
         "comments":[],
         "hidden":false,
         "key":42,
         "audience":"public",
         "time": "Just now",
         "target_friend":"Alex Doe"},
        
    {"name":"Ira Slipan",
         "content":"Alex Doe, you are a fucking cunt.",
         "comments":[],
         "hidden":false,
         "key":41,
         "audience":"public",
         "time": "Just now"},

    {"name":"VICE News",
     "img":"/assets/vice_profile_img.png",
     "photo":"/assets/brand/vice1.png",
     "content": "\"You said the UK/US alliance was the greatest in history and I agree but allies need to treat each other with respect\"",
     "key":40,
     "audience": "public",
     "time":"10 July  ." },
        
    {"name":"Alex Doe",
        "img":"/assets/alex_profile_img.jpg",
        "content":"I think I'm gonna buy an iPhone this Christmas.",
        "key":39,
        "comments":[],
        "audience":"public",
        "time":"29 June"},
        
     {"name":"Jack Scout",
         "content":"Here is a shovel.",
         "photo":"/assets/brand/shovel.png",
         "comments":[],
         "hidden":false,
         "key":38,
         "audience":"public",
         "time": "13 hrs"},

        {"name":"Jack Scout",
         "content":"I don't like losing the hour, but resetting the clocks is always much easier in the spring than in the fall.",
         "comments":[],
         "hidden":false,
         "key":37,
         "audience":"public",
         "time": "13 hrs"},   
        
    {"name":"Ira Slipan",
         "content":"Rumours are impressive bitch!!! At least you're spreading something else besides your legs.",
         "comments":[],
         "hidden":false,
         "key":36,
         "audience":"public",
         "time": "28 Aug"},
        
     
    {"name":"Jack Scout",
         "content":"There's a house for sale near me if anyone is interested. Looks like it comes with a driveway and grass. Seller also willing to include For Sale sign in purchase.",
         "comments":[],
         "photo":"/assets/brand/sale.png",
         "hidden":false,
         "key":35,
         "audience":"public",
         "time": "13 hrs"},
        
    {"name":"Jack Scout",
         "content":"Sitting in a meeting... Don't think I will contribute anything.",
         "comments":[],
         "hidden":false,
         "key":34,
         "audience":"public",
         "time": "13 hrs"},
        
    {"name":"Jack Scout",
         "content":"I just found my rock collection from when I was a kid, they are all accounted for.",
         "comments":[],
         "hidden":false,
         "key":33,
         "audience":"public",
         "time": "13 hrs"},
        
     {"name":"Ira Slipan",
         "content":"They really tried to charge a niggga $800 for a plane ticket back to cali fuck that lol!",
         "comments":[],
         "hidden":false,
         "key":32,
         "audience":"public",
         "time": "13 hrs"}, 
     
    {"name":"Jack Scout",
         "content":"I switched deaodrant today. I can't quite tell if its working",
         "comments":[],
         "hidden":false,
         "key":31,
         "audience":"public",
         "time": "13 hrs"}, 
        
   {"name":"Jack Scout",
         "content":"I remembered to wake up this morning.",
         "comments":[],
         "hidden":false,
         "key":30,
         "audience":"public",
         "time": "13 hrs"},
        
    {"name":"Jack Scout",
         "content":"Almost out I toothpaste. Think I can make it a few more days...",
         "comments":[],
         "hidden":false,
         "key":29,
         "audience":"public",
         "time": "13 hrs"}, 
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "photo":"/assets/users/alex_profile_img.jpg",
         "content":"#New Pic who dis 👍",
         "key":28,
         "comments":[],
         "audience":"public",
         "time":"5 mins",
        "hidden":false},
        
    {"name":"Loren Payton",
     "img":"/assets/loren_profile_img.jpg",
     "photo":"/assets/brand/beer1.jpg",
     "content": "It's going to be a great night with Alex Doe!!",
     "key":27,
     "audience": "public",
     "time":"Just now"},
        
    {"name":"Bill Gates",
     "img":"/assets/bill_profile_img.jpg",
     "photo":"/assets/brand/bill1.png",
     "content": "I first met Paul Allen when I was in 8th grade and he was a sophomore (although he looks like he’s my teacher in this photo). This teletype is the thing that brought us together. I’m so glad that it did:",
     "key":26,
     "audience": "public",
     "time":"3 hrs"},
        
    {"name":"Jim Mend",
     "img":"/assets/jim_profile_img.png",
     "photo":"/assets/brand/jim1.png",
     "content":"",
     "key":25,
     "audience": "public",
     "time":"5 hrs"},

    {"name":"Ira Slipan",
         "content":" I hate when people in the cancer center reek of cigarettes like you know where you are right fucking assholes!",
         "comments":[],
         "hidden":false,
         "key":24,
         "audience":"public",
         "time": "2 hrs"}, 
        
    {"name":"Starbucks",
     "img":"/assets/starbucks_profile_img.png",
     "photo":"/assets/brand/star1.png",
     "content": 'Refreshment comes in every color (especially pink.) \n'+
                 '💖 Pink Drink\n'+ 
                 '💞 Dragon Drink\n'+
                 ' ❤️ Strawberry Acai Starbucks Refreshers\n'+
                 ' 💕 Mango Dragonfruit Starbucks Refreshers',
     "key":23,
     "audience": "public",
     "time":"8 hrs"},
        
    {"name":"The Coca-Cola Company",
     "img":"/assets/coke_profile_img.jpg",
     "photo":"/assets/brand/coke1.png",
     "content": "From grade school through the pros, female athletes lack the same opportunities to play sports as their male counterparts. That's why POWERADE, the official sports drink of the U.S. Women’s National Team, is partnering with the U.S. Soccer Foundation to build “Power Pitches” in underserved communities in Atlanta, Los Angeles and New York City.",
     "key":22,
     "audience": "public",
     "time":"4 hrs"},
        
    {"name":"Sasha Riley",
     "img":"/assets/sasha_profile_img.jpg",
     "content":"You cannot treat people like 🗑️garbage and worship God at the same time!!😇🤔",
     "key":21,
     "comments":[],
     "audience":"public",
     "time":"1 June"},  
        
    { "name":"Kyle Parker",
      "img": "/assets/kyle_profile_img.jpg",
      "content": "Personality: Alex Doe",
       "photo":"/assets/brand/personality.jpg",
       "key":20,
       "comments":[],
       "audience":"public",
       "time": "5 hrs"}, 
        
    {"name":"Alex Doe",
       "img":"/assets/alex_profile_img.jpg",
       "content":"\nMy job interview last week sucked, the interviewer was a jackass who seemed not to know what it is exactly they were looking for. Complete waste of my time! 😡",
       "key":19,
       "comments":[],
       "audience":"public",
       "time":"10 July"},
        
    {"name":"Alex Doe",
       "img":"/assets/alex_profile_img.jpg",
       "content":"To all those who treat women like trash you ought to stop!! #thefuckwrongwithyou!",
       "key":18,
       "comments":[],
       "audience":"public",
       "time":"9 July"},
        
     {"name":"Ira Slipan",
         "content":" I do not have any patience when it comes to traffic and dumb bitches that cut me off!",
         "comments":[],
         "hidden":false,
         "key":17,
         "audience":"public",
         "time": "29 Aug "},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"When you order a headphone dongle and Apple sends you a set of AirPods instead... I guess that works too?\nTook me some moral fortitude to let them know about their mistake 😂",
         "key":16,
         "comments":[],
         "audience":"public",
         "time":"20 June"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"It's that time of the year again when people are trying to sell their old iPhone 😊\nI have an unblemished 64GB silver iPhone 6 Plus with a new battery. Let me know if you're interested!",
         "key":15,
         "comments":[],
         "audience":"public",
         "time":"14 June"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"Digging the low-light capabilities of the new iPhone 📱",
         "key":14,
         "comments":[],
         "audience":"public",
         "time":"12 June"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"\nImagine that Graham had won the nomination and election instead of Trump. Would it really have made a difference? He’d still be the same hate-filled ball of shit, only he’d have kept it covered in that thin veneer of fake decency that his buddy McCain used to fool moderates and liberals into thinking he was a good man. If Trump did one great service to this nation, it’s making these assholes show their true colors. Sure, there are many Republicans who don’t care, but the world will not forget! History is never kind on these kinds of scumbags.",
         "key":13,
         "comments":[],
         "audience":"public",
         "time":"4  June"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"Can I have a profile badge of Mitch McConnell's dick in my face? Because that's how I ( and I suspect many others) feel right now.",
         "key":12,
         "comments":[],
         "audience":"friends",
         "time":"4 June"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"So many things, so little time #keepPushing",
         "key":11,
         "comments":[],
         "audience":"public",
         "time":"3 June"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"If you want it, you must work for it! You can rest when you arrive, but until then, not time can be wasted. You may have to wake up early or go to bed late. You many miss some events or tv shows. You might even lose some fake friends. But if you want it, you must work for it!!!",
         "key":10,
         "comments":[],
         "audience":"public",
         "time":"26 May"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"Destroy the idea that you have to have to be constantly working or grinding in order to be successful. Embrace the concept that rest, recovery and reflection are essential parts of the progress.",
         "key":9,
         "comments":[],
         "audience":"public",
         "time":"24 May"},

    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"Living one day at a time; \nenjoying one moment at a time; \naccepting hardships as the pathway to peace. \n#idowhatican #letgoofwhaticannot #maintainingpeace",
         "key":8,
         "comments":[],
         "audience":"public",
         "time":"14 May"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":" Your journey is not the same as others. Focus on your journey and never look down on anyone else’s journey.👌🏾👌🏾👌🏾",
         "key":7,
         "comments":[],
         "audience":"public",
         "time":"12 May"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"Good morning 🌼❤️🌝 ‭ beautiful people, me and my love, we wish you a lovely happy day!",
         "key":6,
         "comments":[],
         "audience":"public",
         "time":"3 May"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"It’s been a great weekend #Clemsonhomecomingweekend 💙",
         "key":5,
         "comments":[],
         "audience":"public",
         "time":"1  May"},
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"There is beauty in being you✨🖤\n",
         "key":4,
         "comments":[],
         "audience":"public",
         "time":"28 April"}, 
        
    {"name":"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"...another beautiful day 🌸😍\nThe rain gives me December vibes...Thank you My God #itsrainingoutside☔️ #nothingbutgratitude #beautifulday #weareblessed",
         "key":3,
         "comments":[],
         "audience":"public",
         "time":"20 April"},
        
    {name:"Alex Doe",
         "img":"/assets/alex_profile_img.jpg",
         "content":"Mexicans should get the f--k out of here and go back to their f--king country !!!",
         "key":2,
         "comments":[],
         "audience":"public"},
        
    {"name":"Jack Scout",
         "content":"There is a party at my house tommorow",
         "comments":[],
         "hidden":false,
         "key":1,
         "audience":"public",
         "time": "13 hrs"},
        
    {name: 'Alex Doe',
         content: 'Hi, I\'m Alex',
         comments: [{name: 'Jack Scout',
                  img: '/assets/users/jack_profile_img.jpg',
                  content: 'Hi, Alex. I\'m Jack',
                  liked: false}],
         hidden: false,
         audience: "public",
         "time":"7 April",
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
     
    });

   return friends;
}

export function friendNames() {
    
    var names = [];
    
    JSON.parse(localStorage.getItem('users')).forEach((user, index, array) => {
      if (user.friend) {
        names.push(user.name)
      } 
     
    });
    
   return names;    
}

//Images were genereted from google Image search of "people who like both boys + girls for the main profile pic of Alex Doe."

//Names generated from https://www.lingerandlook.com/Names/FictionNames.htm
export function resetUsers() {
  localStorage.setItem('users', JSON.stringify(
    [{name: "Alex Doe",
      profile_pic: 'alex_profile_img.jpg',
      friend: false},
     {name: "Jack Scout",
      profile_pic: 'jack_profile_img.jpg',
      friend: true,
      follow:true},
     {name: "Jim Mend",
      profile_pic: 'jim_profile_img.jpg',
      friend: true,
      follow:true},
     {name:"Sasha Riley",
     profile_pic:'sasha_profile_img.jpg',
     friend:true,
     follow:true},
     {name:"Kyle Parker",
     profile_pic:'kyle_profile_img.jpg',
     friend:true,
     follow:true},
     {name:"Loren Payton",
     profile_pic:'loren_profile_img.jpg',
     friend:true,
     follow:true},
     {name:"VICE News",
      profile_pic:'vice_profile_img.jpg',
      friend:false,
      follow:true},
     {name:"The Coca-Cola Company",
      profile_pic:'coke_profile_img.jpg',
      friend:false,
      follow:true},
     {name:"Starbucks",
      profile_pic:'starbucks_profile_img.jpg',
      friend:false,
      follow:true},
      {name:"Bill Gates",
      profile_pic:'bill_profile_img.jpg',
      friend:false,
      follow:true},
     {name: "Mike Booth",
      profile_pic: 'mike_profile_img.jpg',
      friend: false,
      follow:true},
     
     {name:"Ira Slipan",
      profile_pic: 'ira_profile_img.jpg',
      friend:true,
      follow:true},
     
     {name:"Tanya Strotman",
      profile_pic:'tanya_profile_img.jpg',
      friend:true,
      follow:true},
     
     {name:"Lydia Chopover",
      profile_pic:'lydia_profile_img.jpg',
      friend:true,
      follow:true},
     
     {name:"Esther Rorgash",
      profile_pic:'esther_profile_img.jpg',
      friend:true,
      follow:true},
     
     {name:"Trevin Noushy",
      profile_pic:'trevin_profile_img.jpg',
      friend:true,
      follow:true},
    ]));
}




export function friendList() {
    localStorage.setItem('list', JSON.stringify([{id:1,name:"Family",members:[]},{id:2,name:"Colleagues",members:[]}, {id:3,name:"Recruiters",members:[]},{id:4,name:"Work",members:[]},{id:5,name:"Close Friends",members:[]}]));
}

export function AddfriendList() {
    var friendlists = getParsed('list');
    
    friendlists.map((list,index) => {
        if(index === 1) {
            list.members.push("sasha_riley");
        }
    });
    
  localStorage.setItem('list',JSON.stringify(friendlists));
}

export function getCurrentFriendLists() {
    var arr = ["custom"];
    
    var friendlists = getParsed('list');
    
    friendlists.map( (list, index) => {
        arr .push(list.name); 
     })
    
    return arr;
}

export function resetAdaptations() {
  localStorage.setItem('adaptations', JSON.stringify({}));
}

export function resetSession() {
  localStorage.setItem('session', "");
}

export function resetContactInfo(){
    localStorage.setItem('contactInfo',JSON.stringify({
        alex_doe :{
        mobile:'+1 801 234-5679',
        email:'ladiesman69@yahoo.com',
        dob:'01 January',
        year:'1979',
        gender:'Gender-Neutral',
        political:"Moderate"
        },
        
       jack_scout:{
         mobile:'+1 240 658-9813',
         email:'jacks@gmail.com',
         dob:'21 March',
         year:'1980',
         gender:'Male'
        },
        
        jim_mend :{
            mobile: '+1 203 123-4567',
            email: 'jim_mend@hotmail.com',
            dob: '23 September',
            year:'1999',
            gender: 'Male'
        },
        
        sasha_riley:{
            mobile: '+1 803 187-3456',
            email: 'sasha_riley@gmail.com',
            dob: '25 December',
            year:'1995',
            gender: 'Male'
        }, 
        
        kyle_parker:{
            mobile: '+1 913 187-3956',
            email: 'kyle_parker@gmail.com',
            dob: '15 May',
            year:'1992',
            gender: 'Female'
        }, 
        
        loren_payton:{
            mobile: '+1 413 157-3456',
            email: 'loren_payton@yahoo.com',
            dob: '3 June',
            year:'1997',
            gender: 'Female'
        }, 
        
        mike_booth:{
            mobile: '+1 313 227-4948',
            email: 'mike@gmail.com',
            dob: '28 August',
            year:'1998',
            gender: 'Male'
        },
        
        ira_slipan:{
            mobile: '+1 213 327-5545',
            email: 'slipan@yahoo.com',
            dob: '18 November',
            year:'1991',
            gender: 'Male'
        },
        
        tanya_strotman:{
            mobile: '+1 613 524-6845',
            email: 'tanya@gmail.com',
            dob: '2 October',
            year:'1995',
            gender: 'Female'
        },
        
        lydia_chopover:{
            mobile: '+1 413 427-4655',
            email: 'lydia@gmail.com',
            dob: '20 September',
            year:'1990',
            gender: 'Female'
        },
        
        esther_rorgash:{
            mobile: '+1 313 227-4948',
            email: 'esther@yahoo.com',
            dob: '23 February',
            year:'1997',
            gender: 'Female'
        },
        
        trevin_noushy:{
            mobile: '+1 813 237-6950',
            email: 'trevin@gmail.com',
            dob: '17 April',
            year:'1994',
            gender: 'Male'
        },
    
    }))
}

export function resetAdaptationDisplay(){
    localStorage.setItem('visited',JSON.stringify({
        Delete_Post:{
            suggestion:false,
            highlight:false,
            automation:false
        },
        
        Chat_Offline:{
            suggestion:false,
            highlight: false,
            automation:false
        },
        
        Contact_Info:{
            suggestion:false,
            highlight:false, 
            automation:false
        },
        Basic_Info:{
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
        },
        Block_User:{
            suggestion:false,
            highlight:false,
            automation:false,
            NewsFeed_highlight:false,
        },
        Block_Event:{
            suggestion:false,
            highlight:false,
            automation:false
        },
        Block_App:{
            suggestion:false,
            highlight:false,
            automation:false
        },
        Block_AppInvite:{
            suggestion:false,
            highlight:false,
            automation:false
        },
        Status_Audience:{
            suggestion:false,
            highlight:false,
            automation:false
        },
       Unsubscribe_Friend:{
            suggestion:false,
            highlight:false,
            automation:false,
        },
        Hide_Post: {
            sugggestion:false,
            highlight:false,
            automation:false
        }, 
        Untag_Post: {
            suggestion:false,
            highlight:false,
            automation:false,
        },
        Categorize_Friend:{
            suggestion:false,
            highlight:false,
            automation:false
        }
        
    }))
}

export function blockFriend(name,place) {
    registerEvent("Blocked_User",`${name} was blocked`,place )
    //Add to Blocked Users list
    let BlockedUsers = getParsed('blockedUsers');
    let friendName = linkToName(name);
    
    
    
     if(BlockedUsers.indexOf(friendName) === -1 ){
         BlockedUsers.push(friendName)
      };
    
    addToLocalStorageObject('blockedUsers',BlockedUsers)
    
    
    //Unfriend them
     var users  = getParsed('users')
        users.some((user,index,array) => {
           if(user.name == linkToName(name)){
               users[index].friend = false,
              localStorage.setItem('users', JSON.stringify(users));
              return true;        
           } 
        });
    
    //Hide their posts from the NewsFeed
     var posts = getParsed('posts');
        posts.forEach((post, index,array)=> {

            if (post.name == linkToName(name)) {
                posts[index].hidden = true,
                localStorage.setItem('posts', JSON.stringify(posts));
                return true;   
            }

        });
}

export function resetBlockedUsers(){
  localStorage.setItem('blockedUsers',JSON.stringify(["Richard Roe", "Jane Appleeseed"]))
}

export function resetBlockedApps(){
    localStorage.setItem('blockedApps',JSON.stringify(["Yahoo"]))
}

export function resetBlockedAppInvites(){
    localStorage.setItem('blockedAppInvites',JSON.stringify(["Mike Rogers"]))
}

export function resetBlockedEventInvites(){
    localStorage.setItem('blockedEventInvites',JSON.stringify(["Richard Midor"]))
}

export function resetFeaturesVisited() {
  // As per https://docs.google.com/spreadsheets/d/19BlSfiV7xRTI9TtcAvVFC9B9TlZB1l9CUGx7-jcg_Dk/edit#gid=157833438
  localStorage.setItem('featuresVisited', JSON.stringify({
    chat: {settings: false},
    untag: {self: false},
    friends: {unfollow: false},
    notifications: {app: false, event: false},
    posts: {delete: false, hide: false},
    withhold_info: {address: false, political: false}, //DONE
    // custom_lists: {create_custom: false, post_custom: false, photo_custom: false}, // TODO
    custom_lists: {post_custom: false},
    block: {app: false, user: false},
    audience: {restrict_timeline: false}
  }));
}

export function resetFeaturesUsed() {
  // As per https://docs.google.com/spreadsheets/d/19BlSfiV7xRTI9TtcAvVFC9B9TlZB1l9CUGx7-jcg_Dk/edit#gid=157833438
  localStorage.setItem('featuresUsed', JSON.stringify({
    chat: {settings: false},
    untag: {self: false},
    friends: {unfollow: false},
    notifications: {app: false, event: false},
    posts: {delete: false, hide: false},
    withhold_info: {address: false, political: false}, // TODO
    // custom_lists: {create_custom: false, post_custom: false, photo_custom: false}, // TODO
    custom_lists: {post_custom: false},
    block: {app: false, user: false},
    audience: {restrict_timeline: false}
  }));
}

export function longFeatureTitle(title) {
    return {chat: "Check on your chat settings",
            untag: "Untag yourself from a post",
            friends: "Unfollow a friend",
            notifications: "Check on your notifications",
            posts: " Review some of your posts",
            withhold_info: "Review on your contact and basic information",
            custom_lists: "Review your friend lists",
            block: "Block and/or report abusive friends",
            audience: "Review your audience settings"}[title]
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
  resetFeaturesVisited();
  resetFeaturesUsed();
  resetfriendList();
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
    
    if(!localStorage.list){
         friendList();
        location.reload();
    }
    
    if(!localStorage.featuresVisited) {
        resetFeaturesVisited();
        location.reload();
    }
    
    if(!localStorage.featuresUsed) {
        resetFeaturesUsed();
        location.reload();
    }

}

export function getParsed(name){
    return JSON.parse(localStorage.getItem(name));
}

export function getFollowStatus(name) {
  
    var users  = getParsed('users');
    
    var status = users.some((user,index,array) => {  
            if(user.name == linkToName(name)){ 
               return user.follow;     
           } 
        }); 
    
    return status;
}

export function unFollowUser(name) {
    
    var posts = getParsed('posts');
        posts.forEach((post, index,array)=> {

            if (post.name == linkToName(name)) {
                posts[index].hidden = true,
                localStorage.setItem('posts', JSON.stringify(posts));
                return true;   
            }

        });
         
        var users  = getParsed('users')
        users.some((user,index,array) => {
           if(user.name == linkToName(name)){
               users[index].follow = false,
              localStorage.setItem('users', JSON.stringify(users));
              return true;        
           } 
        });
 
}

export function followUser(name) {
    
    var posts = getParsed('posts');
        posts.forEach((post, index,array)=> {

            if (post.name == linkToName(name)) {
                posts[index].hidden = false,
                localStorage.setItem('posts', JSON.stringify(posts));
                return true;   
            }

        });
         
        var users  = getParsed('users')
        users.some((user,index,array) => {
           if(user.name == linkToName(name)){
               users[index].follow = true,
              localStorage.setItem('users', JSON.stringify(users));
              return true;        
           } 
        });
 
}

export function namesAndLists(){
 //TODO: Combine friends names and list names into array to be accessed by Custom Selector.jsx
    var friends = friendNames();
    var friendlists = getCurrentFriendLists();
    var people_n_lists = friends.concat(friendlists);
    

   return  people_n_lists;
}



export function addToLocalStorageObject (name,value){
    
    
    return localStorage.setItem(name, JSON.stringify(value));   
}

export function saveContactInfo (name, info, value){

   var contacts_Info = getParsed('contactInfo');
   var user_Info =  contacts_Info[name];
    
    user_Info[info] = value
    localStorage.setItem('contactInfo', JSON.stringify(contacts_Info));
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
  let pic = "/assets/users/profile_img.jpg";
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

    case "custom":
      text = "Custom"
      break;
    
    case "family":
       text = "Family"
       break;
          
    default:
      text = (audience !== "")?audience:" ";
  }

   
  return text;
}



export function namesToLinks(str, omitUser=false) {
  // Builds a regular expression matching the name of any user case insensitively
  let regex_str = '(';
  let users = JSON.parse(localStorage.users);
  users.forEach((user, index) => {
    regex_str += user.name;
    if (index != users.length - 1) regex_str += '|';
  });
  regex_str += ')';

  // Find indices and lengths of matches, and produce a JSX object replacing names with links
  let match;
  let matches = [];
  let regex = new RegExp(regex_str, 'gi');
  while ((match = regex.exec(str)) != null) {
    if (omitUser && match[0] == "Alex Doe") continue;
    matches.push(match);
  }
  let end_index = 0;
  // Null-terminate to fill in end of string
  matches.push(null);

  return (
    <span>
    {matches.map((match, index) => {
      if (match == null) {
        return <span key={index}>{str.substr(end_index)}</span>;
      }
      let out = <span key={index}>{str.substr(end_index, (match.index - end_index))}<ProfileLink name={match[0]} /></span>;
      end_index = match.index + match[0].length;
      return out;
    })}
    </span>);
}

