// front

    function updateFront(){
      // generate the id of a new item in case we need to add it to the list
      tempItem = {
        id: maxId() + 1,
        dirty: "new"
      };

      // empty the list
      var node = document.getElementById("itemList");
      node.innerHTML = "";

      // for each object in the array, create a list item in the view
      for (var i = 0; i<objects.length; i++){
        // verify the object has an image defined, otherwise use the default
        var image;
        if (objects[i].image === undefined){
          // default
          image = "resources/empty.svg";
        }else{
          image = objects[i].image;
        }
        // insert each <li> to the <ul> based on the template
        node.insertAdjacentHTML( 'beforeend', template
                                                .replace("{{$id}}", objects[i].id)
                                                .replace("{{$image}}", image)
                                                .replace("{{$description}}", objects[i].description)
                                                .replace("{{$index}}", i)
                                                .replace("{{$index}}", i)
                                );
      }

      // after all <li> tags have been inserted, add the dnd listeners to them
      var lis = document.querySelectorAll('li');

      [].forEach.call(lis, function(li) {
        li.addEventListener('dragstart', handleDragStart, false);
        li.addEventListener('dragenter', handleDragEnter, false);
        li.addEventListener('dragover',  handleDragOver,  false);
        li.addEventListener('dragleave', handleDragLeave, false);
        li.addEventListener('drop', handleDrop, false);
        li.addEventListener('dragend', handleDragEnd, false);
      });

      // adjust the counter
      $("h2 span").text(objects.length);

      // prevent page refreshes on <a> links
      $("ul a").click(function (event){
        event.preventDefault();
      });
    }

    // display the modal
    function edit(index){
      selected = index;
      $('#myModal').modal('show');
    }

    // remove item from the list
    function remove(index){
      // remove it from the array
      var objectToRemove = objects.splice(index, 1)[0];
      // remove it from the database
      deleteObject(objectToRemove);
      // update sortorders
      updateBack();
      // refresh the view
      updateFront();
    }
    
    // load the list of objects from database
    getList();
