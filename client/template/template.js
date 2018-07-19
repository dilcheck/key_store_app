import './layout.html'

Template.layout.events({
    'click #side_menu' : function(e) {
        $('.navbar-primary').toggleClass('collapsed');
    }
})
