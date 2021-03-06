let model = require(_namespace.app_path() + '/Service');
let f = require('../../dashboard/administrator/helpers/functions');
let h = require('../../dashboard/administrator/helpers');

let element =
    {
        title : "Services",
        model : model,
        columns : {
            id : {},
            cover_image : {
                output : row => row.cover('cover_image')
                    .then(att => att
                        ? f.output_image(att, att => att.getFullPath(), {width: 170})
                        : 'no-image'
                    )
            },  
            slug : {},
            name : {},
            description : {
                output : row => row.present().renderShortDescription('description')
            },
            active : {
                output : row => f.output_boolean(row)
            }
        },
        actions : {},
        query : q => q.order("id", false),
        edit_fields : {
            name : {
                type : 'text',
                translatable : true
            },
            cover_image : {
                type : "image",
                multiple : false,
                options : {
                    dstPath : 'uploads/categories',
                    width : 1920,
                    height : 1080
                }
            },
            description : {
                type : "summernote",
                translatable : true
            },
            active : {
                type : 'select',
                options : {
                    0 : 'Inactive',
                    1 : 'Active'
                }
            }
        }
    };

module.exports = element;