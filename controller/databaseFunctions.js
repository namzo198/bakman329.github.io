
import $ from 'jquery';


export const CreateEvent = (event_data)=>{
   
    console.log("Yeah we have been called");
    let action = event_data.action;
    let details = event_data.details;
    let object = event_data.object;
    
    console.log("Action "+action+", Details "+details+" Object"+object);
    
    //submit event_data to api
        $.ajax({
            url:"./controller/eventController.php",
            type:"POST",
            contentType: 'application/json',
            data: JSON.stringify(event_data),
            success:function(response){
                //alert("Successful inserted into database");
                //Emptying of variables and all.
            }.bind(this),
            error: function(xhr,resp,text){
                //show error to console
                //console.log("Error inserting into db from react");
                console.log(xhr.responseText);
                //console.log(xhr,resp,text);
            }
            
        });
    
  
};