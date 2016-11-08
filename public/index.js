
$(function() {
    $.get({
            url: '/list',
            contentType: 'application/json',
            success: (response)=>{
                 $('.listTask').html('');
                response.forEach(function(task){
                    $('.listTask').append('\
                      <li class="list-group-item" id="'+task.id+'"  >'+'<span>'+task.name+'</span>\
                    <button type="button" class="btn btn-success btn-xs  pull-right buttedit"><i class="glyphicon glyphicon-pencil data-reactid=".0.1.0.2.$0.0.0.0"></i></button>\
                    <button type="button" class="btn btn-danger btn-xs  pull-right buttdelete"><i class="glyphicon glyphicon-remove" data-reactid=".0.1.0.2.$0.0.1.0"></i></button>\
                    </li>\
                    ');
                });
            }
        });
//GET
    $('.buttup').on('click',function(){
        $.ajax({
            url: '/list',
            contentType: 'application/json',
            success: function(response){
                 $('.listTask').html('');
                response.forEach(function(task){
                    $('.listTask').append('\
                    <li class="list-group-item" id="'+task.id+'"  >' +'<span>'+task.name+'</span>\
                    <button type="button" class="btn btn-success btn-xs  pull-right buttedit" ><i class="glyphicon glyphicon-pencil data-reactid=".0.1.0.2.$0.0.0.0"></i></button>\
                    <button type="button" class="btn btn-danger btn-xs  pull-right buttdelete"><i class="glyphicon glyphicon-remove" data-reactid=".0.1.0.2.$0.0.1.0"></i></button>\
                    </li>\
                    ');
                });
            }
        });
    });
//POST
    $('.taskForm').on('submit',function(event){
        event.preventDefault();
        var idl;
        console.log($('.listTask li:last-child').attr('id'));
        if($('.listTask li:last-child').attr('id')){idl = parseInt($('.listTask li:last-child').attr('id'))+1 ;} else {idl = 1;}

        $.ajax({
            url: '/list',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id: idl, name: $('.taskInput').val() }),
            success: function(response) {
                console.log(response);
                $('.taskInput').val('');
                $('.buttup').click();
            }
        });
    });
 // DELETE
    $('.listTask').on('click', '.buttdelete', function() {
        var id = $(this).closest('li').attr('id');
console.log(id);
        $.ajax({
            url: '/list/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('.buttup').click();
            }
        });
    });
//Updatw
 /* $('.listTask').on('click', '.buttedit', function(){
        console.log("Hello");
        $(this).closest('li').attr('contenteditable', 'true');
          (this).closest('li').focus();
          $(this).prev().html('.');
           $(this).find('i').attr('class',	'glyphicon glyphicon-floppy-disk');

    });

     $('.listTask').on('click', '.glyphicon-floppy-disk', function(){
        var idl = $(this).closest('li').attr('id');
        console.log(JSON.stringify({id: idl, name: $(this).prev().html() }));
        console.log($(this.prev()));
        $.ajax({
            url: '/list/' +idl,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({id: idl, name: $('#idl span').html() }),
            success: function(response) {
                console.log(response);
                $('.taskInput').val('');
                $('.buttup').click();
            }
        });
     });
*/
    var x = false;
    $('.listTask').on('click','.buttedit', function(){
    if (!x){
    console.log("Hello");
            $(this).closest('li').attr('contenteditable', 'true');
            (this).closest('li').focus();
            $(this).find('i').attr('class',	'glyphicon glyphicon-floppy-disk');
    x = true;
    }
    else {
    var idl = $(this).closest('li').attr('id');
            console.log(JSON.stringify({id: idl, name: $(this).prev().html() }));
            $.ajax({
                url: '/list/' +idl,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({id: idl, name: $(this).prev().html() }),
                success: function(response) {
                    console.log(response);
                    $('.buttup').click();
                }
            });
    $(this).closest('li').attr('contenteditable', 'false');
    $(this).find('i').attr('class',	'glyphicon glyphicon-pencil');
    x = false;
    }
    });
    });


