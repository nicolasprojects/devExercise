// modal events
    
    // on modal shown, fill the form
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').focus();
      if (selected !== null){
        $('.modal-body textarea').val(objects[selected].description);
        $('.modal-body img').attr("src", objects[selected].image);
        $('.modal-body form input').val("");
      }
    });

    // on modal hidden, empty the form
    $('#myModal').on('hidden.bs.modal', function () {
      $('.modal-body textarea').val("");
      $('.modal-body img').attr("src", "resources/empty.svg");
      $('.modal-body form input').val("");
      hideDimensionsError();
    });

    // on modal's click on save button
    $("#save").on("click", function(e){
      // prevent de default action, which is to submit
      e.preventDefault();

      // populate the temp object
      tempItem.description = $(".modal textarea").val();

      // if selected === null means it's a new object, we need to push it to the array
      if (selected === null){
        objects.push(tempItem);
        tempItem = {
          id: maxId() + 1,
          dirty: "new"
        };
      }else{
        // otherwise we need to update the corresponding object
        objects[selected].dirty = "updated";
        if (tempItem.image){
          objects[selected].image = tempItem.image;
        }
        objects[selected].description = tempItem.description;
      }

      $('#myModal').modal('hide');
      updateBack();
      updateFront();
    });