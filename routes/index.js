/**
 * Created with JetBrains WebStorm.
 * User: agurha
 * Date: 13/03/2013
 * Time: 19:08
 * To change this template use File | Settings | File Templates.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Woodpecker' });
};