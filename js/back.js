// data
  
    // This array will store all the data for the list
    var objects = [];
    // Whenever the modal is displayed, an item from the list will be selected for modification
    // selected == null when the item is new and the modal should be empty
    // selected == index when we are modifying an already created object
    var selected = null;
    // we will store the modified object in this variable temporarily
    var tempItem = {};

    // we will show the id, image, description, edit button, remove button.
    var template =
      "<li class=\"row list-group-item\" draggable=\"true\">"+
      "  <div class=\"col-xs-1\"><span>{{$id}}</span></div>"+
      "  <div class=\"col-xs-2\"><img src=\"{{$image}}\" width=\"100px\"/></div>"+
      "  <div class=\"col-xs-7\"><p>{{$description}}</p></div>"+
      "  <div class=\"col-xs-1\"><a title=\"Edit\" href=\"\" onclick=\"edit({{$index}})\"><img src=\"resources/edit.svg\"></a></div>"+
      "  <div class=\"col-xs-1\"><a title=\"Remove\" href=\"\" onclick=\"remove({{$index}})\"><img src=\"resources/remove.svg\"></a></div>"+
      "</li>";


// back
    
    // write the array in the database
    function updateBack(){
      for (var i = 0; i < objects.length; i++){
        if (objects[i].dirty == "new"){
          // if the object is new insert it
          insertObject(objects[i], i);
          console.log("Insert: "+ JSON.stringify(objects[i],null,2));
          objects[i].dirty = null;
        }else{
          // otherwise update it
          updateObject(objects[i], i);
          console.log("Update: "+ JSON.stringify(objects[i],null,2));
        }
      }
    }

    // get list of items from the data base table
    function getList(){
      $.get("server/readItems.php", function(data, status){
        if (typeof data !== "string"){
          objects = data;
          $("#error").text("");
        }else{
          $("#error").text(data);
        }

        // refresh the view
        updateFront();
      });
    }

    // insert item in the data base table via ajax post
    function insertObject(object, index){
      object.sortorder = index;
      $.post("server/insertItem.php", object, function(data, status){});
    }
    // update item in the data base table via ajax post
    function updateObject(object, index){
      object.sortorder = index;
      $.post("server/updateItem.php", object, function(data, status){});
    }
    // delete item in the data base table via ajax post
    function deleteObject(object){
      $.post("server/deleteItem.php", object, function(data, status){});
    }