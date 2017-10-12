let pug = require('pug');
const env = require('env');
const __baseDir = require('basedir').get();

module.exports = (req, res, next) => {

    let __renderPug  = (view, json = {}, status = null) => {
        json.basedir = req.app.locals.basedir = renderTemplatePath();
    
        json.cache = env('template_cache', false);

        try {
            let compiled = pug.renderFile(`${json.basedir}/${view}.pug`, json);

            if(status)
            {
                return res.status(status);
            }

            return res.send(compiled);
        } catch (e) {
            console.log(e);

            res.send(e);
        }
    }

    res.view = __renderPug;
    
    return next();
}

let renderTemplatePath = () => `${__baseDir}/${env('template_path')}`;