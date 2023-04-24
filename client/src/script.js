function showCreateTodoModal(){
    $(".create-todo-item-modal").fadeToggle(100);
    $(".create-todo-item-modal-overlay").fadeToggle(100);
}
    

$(document).on("click", ".todo-items__item__footer__edit", function(){
    var titleContainer = $(this).closest(".todo-items__item").find(".todo-items__item__title");
    var descriptionContainer = $(this).closest(".todo-items__item").find(".todo-items__item__description");
    
    titleContainer.attr("contenteditable", true);
    descriptionContainer.attr("contenteditable", true);

    titleContainer.addClass("edit-mode");
    descriptionContainer.addClass("edit-mode");

    var eventId = "click.edit." + $(this).closest(".todo-items__item").attr('id');
    $(document).on(eventId, function(event) {
        if(!$(event.target).closest(titleContainer).length && !$(event.target).closest(descriptionContainer).length) {
            titleContainer.attr("contenteditable", false);
            descriptionContainer.attr("contenteditable", false);
            titleContainer.removeClass("edit-mode");
            descriptionContainer.removeClass("edit-mode");
            $(document).off(eventId);
        }
    });
});

$(document).on("click", ".todo-items__item__footer__delete", function() {
    $(this).closest('.todo-items__item').remove();
});

$(document).on("submit", ".create-todo-item-modal", function (event){ 
    event.preventDefault();
    var newTodoItem = $("<div></div>");
    newTodoItem.addClass("todo-items__item");

    var title = $("#title").val();
    var titleContainer = $("<h3></h3>");
    titleContainer.addClass("todo-items__item__title");
    titleContainer.html(title);
    newTodoItem.attr('id', title);

    var description = $("#description").val();
    var descriptionContainer = $("<p></p>");
    descriptionContainer.addClass("todo-items__item__description");
    descriptionContainer.html(description);

    $(newTodoItem).append(titleContainer);
    $(newTodoItem).append(descriptionContainer);
    newTodoItem.append(`<h3 class="todo-items__item__date">4/12/2023</h3>`);
    newTodoItem.append(`<div class="todo-items__item__footer">
    <div class="todo-items__item__footer__status">completed</div>
    <i class="fa fa-trash todo-items__item__footer__delete" aria-hidden="true" ></i>
    <i class="fa fa-pencil todo-items__item__footer__edit" aria-hidden="true"></i>
    </div>`);
    $('.todo-items').append(newTodoItem);
    $("#title").val("");
    $("#description").val("");
    showCreateTodoModal();
});