const ArraySections = document.querySelectorAll(".mainSectionPannel");
const ContentPannel = document.getElementById("contentPannel");

var $content;

function loadBody() {
	$(document).ready(function () {
		$.getJSON("todos.json", function (toDoObjects) {
			main(toDoObjects);
		});
	});
}

function organizeByTags(toDoObjects) {
	var toDosDescription = toDoObjects.map(function (toDo) {
		return toDo.description;
	});

	var toDosTags = toDoObjects.map(function (toDo) {
		return toDo.tags;
	});

	var sTags = function(name, toDos) {
		this.name = name;
		this.toDos = toDos
	}

	var array = [];

	for (var i = 0; i < toDosDescription.length; i++) {
		var x = new sTags(toDosDescription[i], toDosTags[i]);
		array.push(x);
	}

	let json = JSON.stringify(array);
	json = JSON.parse(json);
	
	return json;
}

ArraySections.forEach((element) => {
	element.addEventListener("click", function() {
		ContentPannel.classList.add("content-active");
		
		ArraySections.forEach((element) => {
			element.classList.remove("active");
		});
		
		this.classList.add("active");
	})
	
	element.addEventListener("mouseover", function() {
		
		ArraySections.forEach((element) => {
			element.classList.remove("hover");
		});
		
		this.classList.add("hover");
	})
	
	element.addEventListener("mouseout", function() {
		
		ArraySections.forEach((element) => {
			element.classList.remove("hover");
		});
	})
});

var main = function (toDoObjects) {
	"use strict";
	
	var organizedByTag = organizeByTags(toDoObjects);
	
	$(".tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function () {
			$(".tabs a span").removeClass("active");
            $(element).addClass("active");
            $("main .content").empty();
			var $element = $(element);
			$("main .content").empty();
			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for (var i = organizedByTag.length - 1; i > -1; i--) {
					$content.append($("<li>").text(organizedByTag[i].name));
				}
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				organizedByTag.forEach(function (todo) {
					$content.append($("<li>").text(todo.name));
				});
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(3)")) {
				organizedByTag.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name),
					$content = $("<ul>");
					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			} else if ($element.parent().is(":nth-child(4)")) {
				$(".content").append("<input id='description'>");
				$(".content #description").addClass("inputStyleDescription");
				$(".content").append("<br />");
				$(".content").append("<input id='tags'>");
				$(".content #tags").addClass("inputStyleTags");
				$(".content").append("<br />");
				$(".content").append("<button>Добавить</button>");
				$(".content br").addClass("clear");
				$(".content button").addClass("buttonStyle");
			}
			
			return false;
		});
	});

	
	
	$(".content").on("click", ".buttonStyle", function() {
		var newDescription = $("#description").val();
		var newTags =  $("#tags").val().split(',');

		var result = updateJson(toDoObjects, newDescription, newTags);

		organizedByTag = organizeByTags(result);
	});
}

function updateJson(toDoObjects, newDescription, newTags) {
	var newJsonObject = function(description, tags) {
		this.description = description;
		this.tags = tags
	}
	
	var newJson = new newJsonObject(newDescription, newTags);
	toDoObjects.push(newJson);

	return toDoObjects;
}