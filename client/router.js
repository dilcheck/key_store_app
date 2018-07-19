import '../client/template/layout.html'
import '../client/pages/index.html'
import '../client/pages/signup.html'

FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('layout', {main:'index'});
    }
});