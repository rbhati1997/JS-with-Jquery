$(document).ready(function(){
  var event_update_this;

// Function to add data in table.
  $("#add_data_btn").click(function(){

    $('#update_data_btn').hide();
    var name = $("#name").val();
    var age = $("#age").val();
    var rowCount = $('#myTable tr').length + 1;

    var valid = validateData(name, age);

    if(valid) {
        $('#myTable').append(
                '<tr>'
                +'<td id="order">'+rowCount+'</td>'
                +'<td>'+name+'</td>'
                +'<td>'+age+'</td>'
                +'<td><button id="view_btn" class="btn btn-default" data-toggle="modal" data-target="#exampleModal">view</button><button id="update_btn" class="btn btn-default" data-toggle="modal" data-target="#exampleModal">update</button><button id="delete_btn" class="btn btn-default">delete</button><button id="down_btn" class="btn btn-default">down</button><button id="up_btn" class="btn btn-default">up</button></td>'
                +'</tr>');

        $('#name').val("")
        $('#age').val("")
    }


  });

// Function to show modal box in table.
    $('#main_button').on("click", function(){
        $('#name').val("")
        $('#age').val("")
        $('#update_data_btn').hide();
        $('#add_data_btn').show();
      $('#close_btn').show();
    });


// Function to view data in table.
    $("#myTable").on("click","#view_btn", function(){
      $('#add_data_btn').hide();
      $('#close_btn').hide();
      $('#update_data_btn').hide();
      $('#name').val($(this).closest('tr').find('td:eq(1)').text())
      $('#age').val($(this).closest('tr').find('td:eq(2)').text())

    });

// Function to update data in table.
    $("#myTable").on("click","#update_btn", function(){
        $('#add_data_btn').hide();
        $('#close_btn').hide();
        $('#update_data_btn').show();
        $('#name').val($(this).closest('tr').find('td:eq(1)').text())
        $('#age').val($(this).closest('tr').find('td:eq(2)').text())
        event_update_this = this


    });

// Function to update data in table.
    $("#exampleModal").on("click", "#update_data_btn", function(){
        $(event_update_this).closest('tr').find('td:eq(1)').text($('#name').val())
        $(event_update_this).closest('tr').find('td:eq(2)').text($('#age').val())
        alert("Row Update successfully.");

     });


// Function to delete data in table.
    $("#myTable").on("click","#delete_btn", function(){
        i = $(this).closest('tr').find('td:eq(0)').text()
        $(this).closest('tr').remove();
        resetNumber()

  });

//  Function to re-order serial number when row deleted.
  function resetNumber() {
        i = $(this).closest('tr').find('td:eq(0)').text()
        $('#myTable').find('tr').find('td:first').each(function(i){
            $(this).text(parseInt(i)+1);
            alert("Row delete successfully.");
        });
    }


// Function to up row in table.
    $('#myTable').on('click', '#up_btn', function () {
        var thisRow = $(this).closest('tr');
        var prevRow = thisRow.prev();
        var prevRowSerialNo = prevRow[0].childNodes[0].innerHTML
        var thisRowSerialNo = thisRow[0].childNodes[0].innerHTML
        if (prevRow.length) {
            prevRow.before(thisRow);
            thisRow[0].childNodes[0].innerHTML = prevRowSerialNo
            prevRow[0].childNodes[0].innerHTML = thisRowSerialNo
        }
    });

// Function to down data in table.
    $('#myTable').on('click', '#down_btn', function () {
        var thisRow = $(this).closest('tr');
        var nextRow = thisRow.next();
        var thisRowSerialNo = thisRow[0].childNodes[0].innerHTML
        var nextRowSerialNo = nextRow[0].childNodes[0].innerHTML
        if (nextRow.length) {
            nextRow.after(thisRow);
            thisRow[0].childNodes[0].innerHTML = nextRowSerialNo
            nextRow[0].childNodes[0].innerHTML = thisRowSerialNo
        }
    });


// Function for search bar.
    $("#searchInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

// Function for form validation.
  function validateData(name, age) {
    valid = true;
    nameReg = /^[a-zA-Z]+$/;
    ageReg = /^[0-9]+$/;
    if (nameReg.test(name) == false) {
        alert ("please enter valid string for name.");
        valid = false;
    }

    if (valid != false && ageReg.test(age) == false) {
        alert ("please enter valid number for age.");
         valid = false;
    }

    return valid;
  }




});

