
const netbooksController = {};

netbooksController.renderNetsForm = async   (req, res) => {
    //res.send('Render Netbooks Form');

    res.render('netbooks/new-nets',{carritos});
};

netbooksController.createNewNet = async (req, res) => {

};

netbooksController.renderNets = async (req, res) => {
    //res.send('render all notes');
};

netbooksController.renderEditForm = async(req, res) => {
    //res.send('edit notes');
    
};

netbooksController.updateNet = async(req, res) => {
    console.log(req.body);
    
};

netbooksController.deleteNet = (req, res) => {
    //res.send('deleting Note');
    
}

module.exports = netbooksController;