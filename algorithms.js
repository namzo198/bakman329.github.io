//Compute the distance between two strings using DP to find the edit/insert/delete distance btwn them
function min(a,b,c){
    var l = Math.min(a,b)
    return Math.min(l,c)
}
export function levenshteinDistance(str1, str2){
    
    var temp  = []; //To create a 2d matrix
    
    var s1_len =str1.length, s2_len = str2.length;
    
  
    
    //creating an array of arrays to create a 2d matrix ( a descending loop is quicker)
    for( var i = s1_len; i >= 0; i--) temp[i] = [];
    
        //step 2: initializing the 2d matrix
        for(var i = s1_len; i >= 0; i--) temp[i][0] = i;
        for( var j = s2_len; j >= 0; j-- ) temp[0][j] = j;
    
    //step 3
    for(var i = 1; i <= s1_len; i++){
        for(var j = 1; j <= s2_len; j++){
            
            if(str1.charAt(i-1) == str2.charAt(j-1)){
                temp[i][j] = temp[i-1][j-1]
            }else {
                temp[i][j] = 1 + min(temp[i-1][j-1],temp[i-1][j],temp[i][j-1]);
            }
        }
    }
    
   return temp[s1_len][s2_len];
}
