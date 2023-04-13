# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


{
    'name': 'Registro de ventas a credito',
    'version': '1.0',
    'category': 'Point of Sale',
    'sequence': 6,
    'summary': "Settle custumer's due in the POS UI.",
    'description': """""",
    'depends': ['point_of_sale','account'],
    'data': [
        'views/partner_view.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'rod_pos_due/static/src/css/pos.css',
            'rod_pos_due/static/src/js/**/*.js',
        ],
        'web.assets_qweb': [
            'rod_pos_due/static/src/xml/**/*.xml',
        ],
    }
}
