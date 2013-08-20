var DirectoryBrowser = Backbone.View.extend({
    initialize: function() {
        var model = this.model;
        var view = this;

        model.on("add", this.addDirectoryCollection, this);
        model.on("remove", this.removeDirectoryCollection, this);
        model.on("reset", this.render, this);

        $("#directory-collections").on("click", ".directory-collection-action-view", function() {
            var id = $(this).attr("data-id");
            pm.mediator.trigger("showDirectoryCollection", id);
        });

        $("#directory-collections").on("click", ".directory-collection-action-download", function() {
            var id = $(this).attr("data-id");
            var link_id = $(this).attr("data-link-id");
            pm.mediator.trigger("getDirectoryCollection", link_id);
        });

        $(".directory-browser-navigator-next").on("click", function() {
            if(!$(this).hasClass("disabled")) {
                model.loadNext();
            }

        });

        $(".directory-browser-navigator-previous").on("click", function() {
            if(!$(this).hasClass("disabled")) {
                model.loadPrevious();
            }
        });
    },

    render: function() {
        $("#directory-collections").html("");
    },

    renderNavigator: function() {
        var model = this.model;
        var startId = model.startId;
        var length = model.length;

        if (model.lastCount < model.fetchCount) {
            // Disable next
            $(".directory-browser-navigator-next").removeClass("enabled");
            $(".directory-browser-navigator-next").addClass("disabled");
        }
        else {
            $(".directory-browser-navigator-next").removeClass("disabled");
            $(".directory-browser-navigator-next").addClass("enabled");
        }

        if (model.totalCount <= model.fetchCount) {
            $(".directory-browser-navigator-previous").removeClass("enabled");
            $(".directory-browser-navigator-previous").addClass("disabled");
        }
        else {
            $(".directory-browser-navigator-previous").removeClass("disabled");
            $(".directory-browser-navigator-previous").addClass("enabled");
        }

        var start = model.totalCount - model.fetchCount + 1;

        if (start < 0) {
            start = 1;
        }

        var end = model.totalCount;

        $(".directory-browser-navigator-status .start").html(start);
        $(".directory-browser-navigator-status .end").html(end);
    },

    addDirectoryCollection: function(collection) {
        this.renderNavigator();
        $("#directory-collections").append(Handlebars.templates.item_directory_collection(collection.toJSON()));
    },

    removeDirectoryCollection: function(collection) {
        this.renderNavigator();
    },
});